import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
//import Basemaps from './map/basemaps/Basemaps';

mapboxgl.accessToken = 'pk.eyJ1Ijoid2ViaWd1IiwiYSI6ImNqZHd0cTNidzBvM2kyeHM2Mjh2YzdiMGoifQ.3fbmDT3SZof-RM3uSpHMDg';

export default class Map extends Component {

    componentDidMount() {

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/webigu/cjdwtqlgj7dev2snnlo0nfaiu'
        });

        map.on('load', function () {
            map.addLayer({
                "id": "ekosysteemipalvelu",
                "type": "line",
                "source": {
                    "type": "vector",
                    "tiles": ["https://tieto.pirkanmaa.fi/geoserver/gwc/service/tms/1.0.0/maankaytto:Pirkanmaan_ekosysteemipalvelut@EPSG:900913@pbf/{z}/{x}/{y}.pbf"]
                },
                "source-layer": "Pirkanmaan_ekosysteemipalvelut",
                "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                },
                "paint": {
                    "line-opacity": 0.6,
                    "line-color": "rgb(53, 175, 109)",
                    "line-width": 2
                }
            });
        });


    }

    render() {
        return (
            <div id='map' style={{ height: '100vh', width: '100vw' }} ></div>
        );
    }
};