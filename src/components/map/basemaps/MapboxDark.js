import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';

const MapboxDark = new TileLayer({
    source: new XYZ({
        url: 'https://api.mapbox.com/styles/v1/joukojar/ciwpd449y00a52pnvvbuytfn7/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoiam91a29qYXIiLCJhIjoiY2lvam1ubmVhMDA4Z3c0ajdleHl6ZjFtdSJ9.pbxTgzkFQJx-EMxxEJjSEA',
        attributions: [
            '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
            '© <a href="https://www.openstreetmap.org/copyright">' +
            'OpenStreetMap contributors</a>',
        ]
    }),
    title: 'Mapbox (Dark)',
    name: 'MapboxDark',
    type: 'base'
});

export default MapboxDark;