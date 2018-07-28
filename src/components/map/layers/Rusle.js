import TileWMS from 'ol/source/tilewms';
import Tile from 'ol/layer/tile';

const source = new TileWMS({
    url: 'https://aineistot.metsakeskus.fi/metsakeskus/services/Vesiensuojelu/RUSLE_eroosiomalli/MapServer/WMSServer?',
    params: {
        'VERSION': '1.3.0',
        'FORMAT': 'image/png',
        'TRANSPARENT': true,
        'LAYERS': '1',
        'TILED': true
    }
});

const Rusle = new Tile({
    source: source,
    opacity: 0.75,
    title: 'Rusle',
    name: 'Rusle',
    visible: true
});

export default Rusle;