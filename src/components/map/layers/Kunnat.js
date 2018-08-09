import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {all as loadingstrategy} from 'ol/loadingstrategy';

const url = 'http://tieto.pirkanmaa.fi/geoserver/maankaytto/ows?service=WFS&version=1.0.0&request=GetFeature',
    layer = 'maankaytto:kunnat2018',
    proj = 'EPSG:3857',
    format = 'application/json';

const source = new VectorSource({
    format: new GeoJSON(),
    url: (extent) => {
        return `${url}&typename=${layer}&outputFormat=${format}&srsname=${proj}`
    },
    strategy: loadingstrategy
});

const Kunnat = new VectorLayer({
    source: source,
    title: 'Kunnat',
    name: 'Kunnat',
    visible: true,
    style: null
});

export default Kunnat;