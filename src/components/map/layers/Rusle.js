import TileWMS from 'ol/source/TileWMS';
import Tile from 'ol/layer/Tile';

const source = new TileWMS({
    url: 'https://aineistot.metsakeskus.fi/metsakeskus/services/Vesiensuojelu/RUSLE_2015_koko_Suomi_ja_kosteusindeksi_Puruvesi/MapServer/WMSServer?',
    params: {
        'VERSION': '1.3.0',
        'FORMAT': 'image/png',
        'TRANSPARENT': true,
        'LAYERS': '10',
        'TILED': true
    }
});

const Rusle = new Tile({
    source: source,
    opacity: 0.75,
    title: 'Eroosiomalli',
    name: 'Eroosiomalli',
    visible: false,
    description: 'Ei kuvausta olemassa.'
});

export default Rusle;