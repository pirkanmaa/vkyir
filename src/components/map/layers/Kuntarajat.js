import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {all as loadingstrategy} from 'ol/loadingstrategy';

import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';


const url = 'https://tieto.pirkanmaa.fi/geoserver/maankaytto/ows?service=WFS&version=1.0.0&request=GetFeature',
    layer = 'maankaytto:kunnat2018',
    proj = 'EPSG:3857',
    format = 'application/json';

const source = new VectorSource({
    format: new GeoJSON(),
    url: `${url}&typename=${layer}&outputFormat=${format}&srsname=${proj}`,
    strategy: loadingstrategy
});

const Kuntarajat = new VectorLayer({
    source: source,
    title: 'Kuntarajat',
    name: 'Kuntarajat',
    description: 'Suomen kuntarajat vuodelta 2018.',
    visible: true,
    opacity: 0.5,
    style: new Style({
        stroke: new Stroke({
            color: '#888',
            width: 1
        })
    }),
});

export default Kuntarajat;  