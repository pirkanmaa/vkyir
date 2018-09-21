import React, { Component } from 'react';
import OLMap from 'ol/Map';
import View from 'ol/View';
import ZoomIn from './zoom/ZoomIn';
import ZoomOut from './zoom/ZoomOut';
import LayerDrawer from './LayerDrawer';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import highlightFeature from './utils/highlightFeature';

import ImageController from './../../controllers/ImageController';
import SideDrawer from './utils/SideDrawer';

import Basemaps from './basemaps/Basemaps';
import Layers from './layers/Layers';
import KuntaFilter from './layers/KuntaFilter';
import Kunnat from './layers/Kunnat';
import featureOverlay from './layers/FeatureOverlay';

/* Initiate basemap and layers */
let BasemapSel = Basemaps.map(layer => layer["layer"]);
let LayerSel = Layers.map(layer => layer["layer"]);

const styles = theme => ({
    map: {
        height: '100vh'
    },
    paper: {
        padding: theme.spacing.unit,
    }
});

class Map extends Component {

    state = {
        basemap: "CartoLight",
        basemapOpacity: 1,
        filterSelection: 0,
        zoomFactor: 0.1,
        maplayers: [],
        featureInfo: '',
        galleryVisibility: false,
        imageData: []
    };

    view = new View({
        projection: 'EPSG:3857',
        center: [2582597, 8820000],
        zoom: 9.5,
        maxZoom: 18,
        minZoom: 8.5
    });

    /* Initiate map */
    map = new OLMap({
        layers: [...BasemapSel, ...LayerSel, Kunnat, featureOverlay],
        view: this.view,
        controls: []
    });

    componentWillUnmount() {
        this.map.setTarget(undefined)
    }

    componentDidMount() {
        this.map.setTarget('map')

        this.setState({ visibility: Layers.map((item, index) => item.visibility) });

        BasemapSel.find(layer => layer.getProperties().name === this.state.basemap && layer.setVisible(true));
        BasemapSel.find(layer => layer.getProperties().name === this.state.basemap && this.setState({ basemapOpacity: layer.getOpacity() }));

        /* Add visible non-basemap layers to map state */
        this.setState({
            maplayers: LayerSel.filter(layer => {
                return layer.getProperties().type !== 'base' &&
                    layer.getVisible() &&
                    layer.getProperties().name !== 'Kunnat'
            }).map(layer => layer.getProperties().name)
        });

        let prevFeature;
        /* Map click events */
        this.map.on('click', e => {
            let feature = this.map.forEachFeatureAtPixel(e.pixel, feature => feature);
            highlightFeature(feature);
            if (feature) {
                let properties = feature.getProperties();
                this.setState({ featureInfo: properties });

                if (feature.get('tyyppi') && feature.get('nimi')) {
                    if (feature === prevFeature) {
                        this.setState({ galleryVisibility: !this.state.galleryVisibility });
                        this.setState({ imageData: [] })
                    } else {
                        this.setState({ galleryVisibility: true });
                    }
                    ImageController.getImages(feature.get('id')).then(response => {
                        if (response.ok || response.status === 304) {
                            response.json().then(json => {
                                this.setState({
                                    imageData: json.reduce((arr, image) => {
                                        if (!image.includes('thumb')) {
                                            arr.push({ src: image, thumb: `thumb_${image}`, folder: feature.get('id') });
                                        } return arr;
                                    }, [])
                                });
                            });
                        } else {
                            this.setState({
                                imageData: []
                            })
                        }
                    })
                } else {
                    this.setState({ galleryVisibility: false });
                } prevFeature = feature;
            } else {
                this.setState({ galleryVisibility: false });
            }
        });
    }

    /* Zoom In */
    zoomIn = () => {
        let zoom = this.view.getZoom();
        if (zoom < this.view.getMaxZoom()) {
            this.view.setZoom(zoom + this.state.zoomFactor);
        }
    }

    /* Zoom Out */
    zoomOut = () => {
        let zoom = this.view.getZoom();
        if (zoom > this.view.getMinZoom()) {
            this.view.setZoom(zoom - this.state.zoomFactor);
        }
    }

    /* Toggle right side drawer + image gallery */
    toggleGallery = () => {
        this.state.galleryVisibility && highlightFeature();
        this.setState({ galleryVisibility: !this.state.galleryVisibility });
    }

    /* Functionality for municipality filtering menu */
    filterClick = (event, index, option) => {
        let layers = this.map.getLayers().getArray();
        layers.filter((layer) => {
            layer.getProperties().name === 'Kunnat' && layer.getSource().getFeatures().filter(feat => {
                return feat.getProperties().nimi === option && (this.view.fit(feat.getGeometry().getExtent(), this.map.getSize()), highlightFeature(feat, this.map));
            })
        });
        this.setState({ filterSelection: index });
    }

    /* Basemap switcher */
    changeBasemap = (event, value) => {
        let layers = this.map.getLayers().getArray();
        layers.filter((layer, i) => {
            return layer.getProperties().type === 'base'
                && (layer.getProperties().name === value && layers[i].setVisible(true)
                    || layer.getProperties().name !== value && layers[i].setVisible(false));
        });

        this.setState({ basemap: value });

        /* Change Material-UI theme colour according to basemap colour */
        layers.find(layer => layer.getProperties().type === 'base' &&
            layer.getProperties().name === value).getProperties().theme !== this.props.theme.palette.type &&
            this.props.switchTheme();
    };

    /* basemap opacity changer */
    changeBasemapOpacity = (event, value) => {
        this.setState({ basemapOpacity: value });
        let layers = this.map.getLayers().getArray();
        layers.filter(layer => {
            return layer.getProperties().type === 'base'
        }).forEach(basemap => {
            basemap.setOpacity(value);
        })
    };

    /* Map Layer Toggler  */
    toggleLayer = event => {
        let name = event.target.value;
        let index = this.state.maplayers.indexOf(event.target.value);
        index == -1 ? this.setState({ maplayers: [...this.state.maplayers, name] }) : this.setState({ maplayers: this.state.maplayers.splice(index, 1) });
        this.map.getLayers().getArray().find(layer => layer.getProperties().name === name && layer.setVisible(!layer.getVisible()));
    };

    render() {

        const { classes } = this.props;

        return (
            <div>
                <div id='map' className={classes.map} />
                <ZoomIn handleClick={this.zoomIn} />
                <ZoomOut handleClick={this.zoomOut} />
                <LayerDrawer
                    layerDrawerVisibility={this.props.layerDrawerVisibility}
                    basemap={this.state.basemap}
                    changeBasemap={this.changeBasemap}
                    maplayers={this.state.maplayers}
                    toggleLayer={this.toggleLayer}
                    basemapOpacity={this.state.basemapOpacity}
                    changeBasemapOpacity={this.changeBasemapOpacity}
                    map={this.map}
                />
                <KuntaFilter
                    filterSelection={this.state.filterSelection}
                    handleClick={this.filterClick}
                />
                <SideDrawer
                    featureInfo={this.state.featureInfo}
                    imageData={this.state.imageData}
                    galleryVisibility={this.state.galleryVisibility}
                    toggleGallery={this.toggleGallery}
                />
            </div>
        );
    }
};

export default withStyles(styles)(Map);