import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

const MapboxSatellite = new TileLayer({
    source: new XYZ({
        url: 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFya29rYXVwcGkiLCJhIjoiY2ltaGpoZTY0MDAwOXZnbTI3OHlqNzJnNSJ9._Wumvn3BiwOA5fRjXJN-xw',
        attributions: [
            '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
            '© <a href="https://www.osm.org/copyright">OpenStreetMap contributors</a>'
        ]
    }),
    title: 'Satelliitti (MapBox)',
    name: 'MapboxSatellite',
    type: 'base',
    theme: 'dark',
    opacity: 1,
    visible: false
});

export default MapboxSatellite;