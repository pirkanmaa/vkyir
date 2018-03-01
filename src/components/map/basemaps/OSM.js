import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';

const OSM = new TileLayer({
    source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attributions: ['&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors']
    }),
    title: 'OpenStreetMap',
    name: 'OSM',
    type: 'base'
});

export default OSM;