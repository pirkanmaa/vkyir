import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import GeoJSON from 'ol/format/geojson';
import loadingstrategy from 'ol/loadingstrategy';

const url = 'https://tieto.pirkanmaa.fi/geoserver/maankaytto/ows?service=WFS&version=1.0.0&request=GetFeature',
    layer = 'maankaytto:kunnat2018',
    proj = 'EPSG:3857',
    format = 'application/json';

const source = new VectorSource({
    format: new GeoJSON(),
    url: (extent) => {
        return `${url}&typename=${layer}&outputFormat=${format}&srsname=${proj}`
    },
    strategy: loadingstrategy.all
});

const Kunnat = new VectorLayer({
    source: source,
    title: 'Kunnat',
    name: 'Kunnat',
    visible: true,
    style: null
});

export default Kunnat;