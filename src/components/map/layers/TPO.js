import TileWMS from 'ol/source/TileWMS';
import ImageWMS from 'ol/source/ImageWMS';
import Tile from 'ol/layer/Tile';

const source = new TileWMS({
    url: 'https://tieto.pirkanmaa.fi/geoserver/pirely/wms?service=WMS&request=GetMap',
    params: {
        'VERSION': '1.3.0',
        'FORMAT': 'image/png',
        'TRANSPARENT': true,
        'LAYERS': 'pirely:TPO',
        'TILED': false,
        'CRS': 'EPSG:3067',
        'STYLES': ''
    }
});

const TPO = new Tile({
    extent: [249165, 6821146, 326873, 6903282],
    source: source,
    opacity: 0.75,
    title: 'Vesienhoidon tehostamisalueet',
    name: 'Vesienhoidon tehostamisalueet',
    visible: false,
    description: `Tehostamisalueilla vesistöjen vedenlaatu edellyttää tehostettujen vesiensuojelumenetelmien käyttöä.`
});

export default TPO;