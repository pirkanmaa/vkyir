import React, { Component } from 'react';
import OLMap from 'ol/map';
import View from 'ol/view';
import Zoom from 'ol/control/zoom';
import ZoomIn from './map/ZoomIn';
import ZoomOut from './map/ZoomOut';
import BasemapControl from './map/BasemapControl';
import Basemaps from './map/basemaps/Basemaps';

const styles = {
    map: {
        height: '100vh',
        margin: 0
    }
}

let view = new View;

export default class Map extends Component {

    state = {
        center: [1100000, 7600000],
        zoom: 7,
        maxZoom: 10,
        minZoom: 7,
        zoomStep: 0.1,
        basemap: "CartoLight"
    };

    componentDidMount() {

        view.setCenter(this.state.center);
        view.setZoom(this.state.zoom);
        view.setMaxZoom(this.state.maxZoom);
        view.setMinZoom(this.state.minZoom);

        let map = new OLMap({
            target: 'map',
            layers: [Basemaps[this.state.basemap]],
            view: view,
            controls: []
        });

        map.on('moveend', () => {
            this.setState({ zoom: view.getZoom() });
        });
    }

    /* Map Zoomers */
    zoomIn = () => {
        if (this.state.zoom < this.state.maxZoom) {
            this.setState({ zoom: this.state.zoom + this.state.zoomStep });
        }
    }

    zoomOut = () => {
        if (this.state.zoom > this.state.minZoom) {
            this.setState({ zoom: this.state.zoom - this.state.zoomStep });
        }
    }

    /* Basemap switcher */
    changeBasemap = (event, value) => {
        this.setState({ basemap: value });       
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.zoom !== prevState.zoom) {
            view.setZoom(this.state.zoom);
        }
        if (this.state.basemap !== prevState.basemap) {
            // TÄMÄ KESKEN
        }
    }

    render() {
        return (
            <div>
                <ZoomIn handleClick={this.zoomIn} />
                <ZoomOut handleClick={this.zoomOut} />
                <ZoomOut handleClick={this.zoomOut} />
                {<BasemapControl
                    handleChange={this.changeBasemap}
                    basemap={this.state.basemap}
                />}
                <div id='map' style={styles.map}>
                </div>
            </div>
        );
    }
};