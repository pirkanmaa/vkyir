import TileWMS from 'ol/source/TileWMS';
import ImageWMS from 'ol/source/ImageWMS';
import Tile from 'ol/layer/Tile';

const source = new TileWMS({
    url: 'https://tieto.pirkanmaa.fi/geoserver/pirely/wms?service=WMS&request=GetMap',
    params: {
        'VERSION': '1.3.0',
        'FORMAT': 'image/png',
        'TRANSPARENT': true,
        'LAYERS': 'pirely:Vesienhoito_kunnostuskohteet',
        'TILED': false,
        'CRS': 'EPSG:3067',
        'STYLES': ''
    }
});

const Kunnostusalueet = new Tile({
    source: source,
    opacity: 1,
    title: 'Järvi- ja jokikunnostusalueet',
    name: 'Järvi- ja jokikunnostusalueet',
    visible: false,
    description: `Tehostamisalueilla vesistöjen vedenlaatu edellyttää tehostettujen vesiensuojelumenetelmien käyttöä.`
});

export default Kunnostusalueet;