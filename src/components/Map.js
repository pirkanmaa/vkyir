import React, { Component } from 'react';
import OLMap from 'ol/map';
import View from 'ol/view';
import Zoom from 'ol/control/zoom';
import ScaleLine from 'ol/control/scaleline';
import ZoomIn from './map/ZoomIn';
import ZoomOut from './map/ZoomOut';
import Basemaps from './map/basemaps/Basemaps';
import LayerControl from './LayerControl';
import { VTTestLayer, GJTestLayer, GJVTTestLayer } from './map/layers/TestLayer';
//import './ColorControl';

let view = new View;
let scaleLine = new ScaleLine;

export default class Map extends Component {

    state = {
        center: [2650000, 8750000],
        zoom: 10,
        maxZoom: 10,
        minZoom: 7,
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
        GJVTTestLayer().then(result => map.addLayer(result));

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

    componentDidUpdate(prevProps, prevState) {
        this.state.zoom !== prevState.zoom && view.setZoom(this.state.zoom);
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