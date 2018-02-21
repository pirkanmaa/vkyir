import React, { Component } from 'react';
import OLMap from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';
import Zoom from 'ol/control/zoom';

const defaults = {
    center: [1100000, 7600000],
    zoom: 7
}

const basemaps = {
    osm: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    mapboxGray: 'https://api.mapbox.com/styles/v1/webigu/cjdwtqlgj7dev2snnlo0nfaiu/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2ViaWd1IiwiYSI6ImNqZHd0cTNidzBvM2kyeHM2Mjh2YzdiMGoifQ.3fbmDT3SZof-RM3uSpHMDg'
}

class Map extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        let map = new OLMap({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: basemaps.mapboxGray
                    })
                })
            ],
            view: new View({
                center: defaults.center,
                zoom: defaults.zoom
            }),
            controls: [new Zoom]
        });
    }

    render() {
        return (
            <div className='map' id='map'></div>
        );
    }
};

export default Map;