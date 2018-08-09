import React, { Component } from 'react';
import OLMap from 'ol/map';
import View from 'ol/view';
import Zoom from 'ol/control/zoom';
import ZoomIn from './zoom/ZoomIn';
import ZoomOut from './zoom/ZoomOut';
import LayerDrawer from './LayerDrawer';
import Basemaps from './basemaps/Basemaps';
import Layers from './layers/Layers';
import KuntaFilter from './layers/KuntaFilter';
import Kunnat from './layers/Kunnat';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import highlightFeature from './utils/highlightFeature';
import featureOverlay from './layers/FeatureOverlay';
import ImageController from './../../controllers/ImageController';
import SideDrawer from './utils/SideDrawer';

let view = new View({
    projection: 'EPSG:3857'
});

let blackList = ['id', 'ID', 'FID', 'fid', 'bbox', 'geometry'];

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit,
    },
    popover: {
        pointerEvents: 'none',
    },
    popperClose: {
        pointerEvents: 'none',
    },
});

class Map extends Component {

    state = {
        center: [2650000, 8750000],
        maxZoom: 18,
        minZoom: 3,
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

        map.on('click', e => {
            let feature = map.forEachFeatureAtPixel(e.pixel, feature => feature);
            highlightFeature(feature, map);
            if (feature) {
                let properties = feature.getProperties();
                blackList.map(key => delete properties[key]);
                //let keys = Object.keys(properties);
                this.setState({ featureInfo: properties });
                //this.handlePopoverOpen();
                if (feature.get('tyyppi') && feature.get('nimi')) {
                    this.setState({ galleryVisibility: true });
                    ImageController.getImages(feature.get('id')).then(response => {
                        if (response.ok) {
                            response.json().then(json => {
                                this.setState({
                                    imageData: json.map((image, index) => {
                                        return { img: `${image}`, title: `image${index}`, folder: feature.get('id') }
                                    })
                                })
                            });
                        } else {
                            this.setState({
                                imageData: []
                            })
                        }
                    })
                } else {
                    this.setState({ galleryVisibility: false });
                }
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

    toggleGallery = feature => {
        this.setState({ galleryVisibility: !this.state.galleryVisibility });
    }

    /* Popover controls */
    handlePopoverOpen = event => {
        this.setState({ popOpen: true });
    };

    handlePopoverClose = () => {
        setTimeout(() => { this.setState({ popOpen: false }) }, 1000);
    };

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
        this.state.basemap !== prevState.basemap && this.changeBasemap(null, this.state.basemap);
        if (this.state.zoom !== prevState.zoom ||
            this.state.center !== prevState.center ||
            this.state.basemap !== prevState.basemap) {
            this._updateUrl();
        }
    }

    /* Send new url query string to App */
    _updateUrl = () => {
        let urlQuery = [];
        let zoom = Number(this.state.zoom).toFixed(1);
        let x = Number(this.state.center[0]).toFixed(0);
        let y = Number(this.state.center[1]).toFixed(0);
        let basemap = this.state.basemap;
        urlQuery.push({ z: zoom });
        urlQuery.push({ x: x });
        urlQuery.push({ y: y });
        urlQuery.push({ b: basemap });
        this.props.updateUrl(urlQuery);
    }

    /* Register changes from props changes (e.g. url query zoom from parent) */
    /* returns new state / null depending on wether state should change */
    /* TODO: Figure out how to props on state only once */
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.zoom && !prevState.zoom) {
            return { zoom: nextProps.zoom };
        }
        if (nextProps.center && !prevState.centerFromUrl) {
            return { center: nextProps.center, centerFromUrl: true };
        }
        if (nextProps.basemap && !prevState.basemapFromUrl) {
            return { basemap: nextProps.basemap, basemapFromUrl: true };
        }
        return null;
    }

    render() {

        const { classes } = this.props;
        const { popoverAnchor, popOpen } = this.state;

        return (
            <div>
                <ZoomIn handleClick={this.zoomIn} />
                <ZoomOut handleClick={this.zoomOut} />
                <Popover id="popover"
                    className={classes.popover}
                    classes={{ paper: classes.paper }}
                    open={popOpen}
                    anchorPosition={{ top: 0, left: 0 }}
                    onClose={this.handlePopoverClose}
                    onEntered={this.handlePopoverClose}
                >
                <Typography>{this.state.featureInfo}</Typography>
                </Popover>
                <LayerDrawer
                    layerDrawerVisibility={this.props.layerDrawerVisibility}
                    basemap={this.state.basemap}
                    changeBasemap={this.changeBasemap}
                    maplayers={this.state.maplayers}
                    toggleLayer={this.toggleLayer}
                    basemapOpacity={this.state.basemapOpacity}
                    changeBasemapOpacity={this.changeBasemapOpacity}
                    map={this.state.map}
                    setData={this.props.setData}
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