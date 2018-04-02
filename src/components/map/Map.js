import React, { Component } from 'react';
import OLMap from 'ol/map';
import View from 'ol/view';
import Zoom from 'ol/control/zoom';
import ZoomIn from './ZoomIn';
import ZoomOut from './ZoomOut';
import Basemaps from './basemaps/Basemaps';
import LayerControl from './LayerControl';
import { GJTestLayer } from './layers/TestLayer';
//import './ColorControl';

let view = new View({
    projection: 'EPSG:3857'
});

export default class Map extends Component {

    state = {
        center: [2650000, 8750000],
        maxZoom: 10,
        minZoom: 3,
        zoomStep: 0.1,
        basemap: "CartoLight",
        basemapOpacity: 1
    };

    componentDidMount() {

        view.setCenter(this.state.center);
        view.setZoom(this.state.zoom);
        view.setMaxZoom(this.state.maxZoom);
        view.setMinZoom(this.state.minZoom);

        /* Initiate basemap == Set the default Basemap selection visible */
        let BasemapSel = Basemaps.map(layer => layer["layer"]);
        BasemapSel.find(layer => layer.getProperties().name === this.state.basemap && layer.setVisible(true));

        /* Initiate map */
        let map = new OLMap({
            target: 'map',
            layers: [...BasemapSel],
            view: view,
            controls: []
        });


        /* Bind "map" to state */
        this.setState({ map: map });

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

    /* Basemap switcher */
    changeBasemap = (event, value) => {

        let layers = this.state.map.getLayers().getArray();
        layers.filter(function (item, i) {
            return item.getProperties().type === 'base'
                && (item.getProperties().name === value && layers[i].setVisible(true)
                    || item.getProperties().name !== value && layers[i].setVisible(false));
        });

        /* Change Material-UI theme colour according to basemap colour */
        layers.find(layer => layer.getProperties().type === 'base' && layer.getProperties().name === value)
            .getProperties().theme !== this.props.theme.palette.type && this.props.switchTheme();

        this.setState({ basemap: value });

    };

    changeBasemapOpacity = () => { };

    /* Register view to change along with this.state.zoom */
    componentDidUpdate(prevProps, prevState) {
        /* Check if zoom / center has changed from last time */
        this.state.zoom !== prevState.zoom && view.setZoom(this.state.zoom);
        this.state.center !== prevState.center && view.setCenter(this.state.center);
        if (this.state.zoom !== prevState.zoom || this.state.center !== prevState.center) {
            this._updateUrl();
        }
    }

    _updateUrl = () => {
        let urlQuery = [];
        let zoom = Number(this.state.zoom).toFixed(2);
        let lon = Number(this.state.center[0] / 100000).toFixed(4);
        let lat = Number(this.state.center[1] / 100000).toFixed(4);
        urlQuery.push({ zoom : zoom });
        urlQuery.push({ lon: lon });
        urlQuery.push({ lat: lat });
        this.props.updateUrl(urlQuery);
    }

    /* Register changes from props changes (e.g. url query zoom from parent) */
    /* returns new state / null depending on wether state should change */
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.zoom && !prevState.zoom) {
            return { zoom: nextProps.zoom };
        }
        return null;
    }

    render() {
        return (
            <div>
                <ZoomIn handleClick={this.zoomIn} />
                <ZoomOut handleClick={this.zoomOut} />
                <LayerControl
                    layerControlVisibility={this.props.layerControlVisibility}
                    handleChange={this.changeBasemap}
                    basemap={this.state.basemap}
                    basemapOpacity={this.state.basemapOpacity}
                    changeBasemapOpacity={this.changeBasemapOpacity}
                />
                <div id='map' style={{ height: '100vh' }} />
            </div>
        );
    }
};
