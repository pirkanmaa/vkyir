import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';

const CartoLight = new TileLayer({
    source: new XYZ({
        url: 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        attributions: ['&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>']
    }),
    title: 'CARTO Positron (OSM)',
    name: 'CartoLight',
    type: 'base'
});

export default CartoLight;