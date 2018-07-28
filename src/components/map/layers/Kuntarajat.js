import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import GeoJSON from 'ol/format/geojson';
import loadingstrategy from 'ol/loadingstrategy';

import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';


const url = 'https://tieto.pirkanmaa.fi/geoserver/maankaytto/ows?service=WFS&version=1.0.0&request=GetFeature',
    layer = 'maankaytto:kunnat2018',
    proj = 'EPSG:3857',
    format = 'application/json';

const source = new VectorSource({
    format: new GeoJSON(),
    url: `${url}&typename=${layer}&outputFormat=${format}&srsname=${proj}`,
    strategy: loadingstrategy.all
});

const Kuntarajat = new VectorLayer({
    source: source,
    title: 'Kuntarajat',
    name: 'Kuntarajat',
    visible: true,
    style: new Style({
        stroke: new Stroke({
            color: '#888',
            width: 1
        })
    }),
});

export default Kuntarajat;