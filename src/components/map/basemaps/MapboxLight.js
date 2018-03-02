import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';

const MapboxLight = new TileLayer({
    source: new XYZ({
        url: 'https://api.mapbox.com/styles/v1/webigu/cjdwtqlgj7dev2snnlo0nfaiu/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2ViaWd1IiwiYSI6ImNqZHd0cTNidzBvM2kyeHM2Mjh2YzdiMGoifQ.3fbmDT3SZof-RM3uSpHMDg',
        attributions: [
            '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
            '© <a href="https://www.osm.org/copyright">OpenStreetMap contributors</a>'
        ]
    }),
    title: 'Mapbox (Light)',
    name: 'MapboxLight',
    type: 'base',
    opacity: 1,
    visible: false
});

export default MapboxLight;