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

        //let currentExtent= map.getView().calculateExtent(map.getSize());

        /* Bind "map" to state */
        this.setState({ map: map });
        //GJVTTestLayer().then(result => map.addLayer(result));

        map.on('moveend', () => this.setState({ zoom: view.getZoom() }));
        /* map.on('moveend', () => {
            console.log(GJTestLayer.getSource().getFeaturesInExtent(map.getView().calculateExtent(map.getSize())));
        } ); */
        // Testing MVT interaction
        /*map.on('click', function (e) {
            map.forEachFeatureAtPixel(e.pixel, function (feature) {
                const properties = feature.getProperties();
                console.log(properties);
            });
        });
        */

    }

    /* Map Zoomers */
    zoomIn = () => this.state.zoom < this.state.maxZoom && this.setState({ zoom: this.state.zoom + this.state.zoomStep });
    zoomOut = () => this.state.zoom > this.state.minZoom && this.setState({ zoom: this.state.zoom - this.state.zoomStep });

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

    /* Register changes if e.g. zoom is provided in the url query string */
    componentWillUpdate(nextProps, nextState) {
        /*
        if (nextProps.zoom !== this.state.zoom) {
            this.setState({ zoom: nextProps.zoom });
        }*/
        if (nextProps.center !== this.state.center) {
            this.setState({ center: nextProps.center });
        }
    }

    /* Register view to change along with this.state.zoom */
    componentDidUpdate(prevProps, prevState) {
        let urlQuery = {};

        //this.state.zoom !== prevState.zoom && view.setZoom(this.state.zoom);
        console.log(this.state.center);
        this.state.center !== prevState.center && view.setCenter(this.state.center);

        if (this.state.zoom !== prevState.zoom) {
            view.setZoom(this.state.zoom);
            urlQuery.z = Number(this.state.zoom).toFixed(2);
        }
        /*
        if (this.state.center !== prevState.center) {
            view.setCenter(this.state.center);
            urlQuery.c = this.state.center;
            console.log(this.state.center);
        }*/
        console.log('update component');

        this.props.testi(urlQuery);
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
