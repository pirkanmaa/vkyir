import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';

const CartoLight = new TileLayer({
    source: new XYZ({
        url: 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        attributions: [
            '© <a href="https://carto.com/attributions">CARTO</a> ' +
            '© <a href="https://www.osm.org/copyright">OpenStreetMap contributors</a>'
        ]
    }),
    title: 'Vaalea (CARTO)',
    name: 'CartoLight',
    type: 'base',
    opacity: 1,
    theme: 'light',
    visible: false
});

export default CartoLight;