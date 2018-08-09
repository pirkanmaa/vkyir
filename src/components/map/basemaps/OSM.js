import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

const OSM = new TileLayer({
    source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attributions: [
            '© <a href="https://www.osm.org/copyright">OpenStreetMap contributors</a>'
        ]
    }),
    title: 'Opaskartta (OSM)',
    name: 'OSM',
    type: 'base',
    opacity: 1,
    theme: 'light',
    visible: false
});

export default OSM;