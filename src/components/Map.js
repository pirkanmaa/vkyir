import React, { Component } from 'react';
import OLMap from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';
import Zoom from 'ol/control/zoom';
import ZoomIn from './tools/ZoomIn';
import ZoomOut from './tools/ZoomOut';

const styles = {
    map: {
        height: '100vh',
        margin: 0
    }
}

const basemaps = {
    osm: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    mapboxGray: 'https://api.mapbox.com/styles/v1/webigu/cjdwtqlgj7dev2snnlo0nfaiu/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2ViaWd1IiwiYSI6ImNqZHd0cTNidzBvM2kyeHM2Mjh2YzdiMGoifQ.3fbmDT3SZof-RM3uSpHMDg'
}

let view = new View;

class Map extends Component {
    state = {
        center: [1100000, 7600000],
        zoom: 7,
        maxZoom: 10,
        minZoom: 7,
        zoomStep: 0.1
    };

    componentDidMount() {

        view.setCenter(this.state.center);
        view.setZoom(this.state.zoom);
        view.setMaxZoom(this.state.maxZoom);
        view.setMinZoom(this.state.minZoom);

        var map = new OLMap({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: basemaps.mapboxGray
                    })
                })
            ],
            view: view,
            controls: []
        });

        map.on('moveend', () => {
            this.setState({zoom: view.getZoom()});
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.zoom !== prevState.zoom) {
            view.setZoom(this.state.zoom);
        }
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

    render() {
        return (
            <div>
                <ZoomIn handleClick={this.zoomIn} />
                <ZoomOut handleClick={this.zoomOut} />
                <div id='map' style={styles.map}>
                </div>
            </div>
        );
    }
};

export default Map;
