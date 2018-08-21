import TileWMS from 'ol/source/TileWMS';
import Tile from 'ol/layer/Tile';

const source = new TileWMS({
    url: 'http://paikkatieto.ymparisto.fi/arcgis/services/SYKE/SYKE_PintavesienEkologinenTila/MapServer/WMSServer?',
    params: {
        'VERSION': '1.3.0',
        'FORMAT': 'image/png',
        'TRANSPARENT': true,
        'LAYERS': '2',
        'TILED': true
    }
});

const Pintavesieko = new Tile({
    source: source,
    opacity: 0.75,
    title: 'Pintavesien ekologinen luokitus',
    name: 'Pintavesien ekologinen luokitus',
    visible: false,
    description: 'Pintavesien (tässä: järvien) ekologinen luokitus vuodelta 2016.'
});

export default Pintavesieko;