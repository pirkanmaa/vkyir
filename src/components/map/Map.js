import React, { Component } from 'react';
import OLMap from 'ol/Map';
import View from 'ol/View';
import Zoom from 'ol/control/Zoom';
import ZoomIn from './zoom/ZoomIn';
import ZoomOut from './zoom/ZoomOut';
import LayerDrawer from './LayerDrawer';
import Basemaps from './basemaps/Basemaps';
import Layers from './layers/Layers';
import KuntaFilter from './layers/KuntaFilter';
import Kunnat from './layers/Kunnat';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import highlightFeature from './utils/highlightFeature';
import featureOverlay from './layers/FeatureOverlay';
import ImageController from './../../controllers/ImageController';
import SideDrawer from './utils/SideDrawer';

let view = new View({ projection: 'EPSG:3857' });

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit,
    }
});

class Map extends Component {

    state = {
        center: [2582597, 8820000],
        maxZoom: 18,
        minZoom: 8.5,
        zoomStep: 0.1,
        basemap: "CartoLight",
        basemapOpacity: 1,
        centerFromUrl: false,
        basemapFromUrl: false,
        filterSelection: 0,
        maplayers: [],
        popOpen: false,
        popoverAnchor: null,
        featureInfo: '',
        galleryVisibility: false,
        imageData: []
    };

    componentDidMount() {
        view.setCenter(this.state.center);
        view.setZoom(this.state.zoom);
        view.setMaxZoom(this.state.maxZoom);
        view.setMinZoom(this.state.minZoom);

        /* Initiate basemap == Set the default Basemap selection visible */
        let BasemapSel = Basemaps.map(layer => layer["layer"]);
        let LayerSel = Layers.map(layer => layer["layer"]);
        this.setState({ visibility: Layers.map((item, index) => item.visibility) });

        BasemapSel.find(layer => layer.getProperties().name === this.state.basemap && layer.setVisible(true));
        BasemapSel.find(layer => layer.getProperties().name === this.state.basemap && this.setState({ basemapOpacity: layer.getOpacity() }));

        /* Initiate map */
        let map = new OLMap({
            target: 'map',
            layers: [...BasemapSel, ...LayerSel, Kunnat, featureOverlay],
            view: view,
            controls: []
        });

        /* Bind "map" to state */
        this.setState({ map: map });

        /* Add visible non-basemap layers to map state */
        this.setState({
            maplayers: LayerSel.filter(layer => {
                return layer.getProperties().type !== 'base' &&
                    layer.getVisible() &&
                    layer.getProperties().name !== 'Kunnat'
            }).map(layer => layer.getProperties().name)
        });

        /* Register state to listen for map events */
        map.on('moveend', () => {
            let newZoom = view.getZoom();
            let newCenter = view.getCenter();
            if (newZoom !== this.state.zoom) {
                this.setState({ zoom: newZoom })
            }
            if (newCenter !== this.state.center) {
                this.setState({ center: newCenter });
            }
        });

        let prevFeature;
        /* Map click events */
        map.on('click', e => {
            let feature = map.forEachFeatureAtPixel(e.pixel, feature => feature);
            highlightFeature(feature, map);
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

    /* Map Zoomers */
    zoomIn = () => {
        let newZoom = this.state.zoom + this.state.zoomStep;
        this.state.zoom < this.state.maxZoom
            && this.setState({ zoom: newZoom });
    }
    zoomOut = () => {
        this.state.zoom > this.state.minZoom
            && this.setState({ zoom: this.state.zoom - this.state.zoomStep });
    }

    /* Toggle right side drawer + image gallery */
    toggleGallery = feature => {
        this.setState({ galleryVisibility: !this.state.galleryVisibility });
    }

    /* Functionality for municipality filtering menu */
    filterClick = (event, index, option) => {

        let layers = this.state.map.getLayers().getArray();
        layers.filter((layer) => {
            return layer.getProperties().name === 'Kunnat' && layer.getSource().getFeatures().filter(feat => {
                return feat.getProperties().nimi === option && (this.state.map.getView().fit(feat.getGeometry().getExtent(), this.state.map.getSize()), highlightFeature(feat, this.state.map));
            })
        });

        this.setState({ filterSelection: index });

    }

    /* Basemap switcher */
    changeBasemap = (event, value) => {

        let layers = this.state.map.getLayers().getArray();
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
        let layers = this.state.map.getLayers().getArray();
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
        this.state.map.getLayers().getArray().find(layer => layer.getProperties().name === name && layer.setVisible(!layer.getVisible()));
    };

    /* Register view to change along with this.state.zoom */
    componentDidUpdate(prevProps, prevState) {
        /* Check if zoom / center / basemap has changed from last time */
        /* TODO: Figure out a better structure for this */
        this.state.zoom !== prevState.zoom && view.setZoom(this.state.zoom);
        this.state.center !== prevState.center && view.setCenter(this.state.center);
    }

    render() {

        const { classes } = this.props;
        const { popoverAnchor, popOpen } = this.state;

        return (
            <div>
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
                    map={this.state.map}
                />
                <div id='map' style={{ height: '100vh' }} />
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