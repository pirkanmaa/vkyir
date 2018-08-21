import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {all as loadingstrategy} from 'ol/loadingstrategy';

import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Circle from 'ol/style/Circle';

const url = 'https://tieto.pirkanmaa.fi/geoserver/pirely/ows?service=WFS&version=1.0.0&request=GetFeature',
    layer = 'pirely:vesty',
    proj = 'EPSG:3857',
    format = 'application/json';

const source = new VectorSource({
    format: new GeoJSON(),
    url: `${url}&typename=${layer}&srsname=${proj}&outputFormat=${format}`,
    strategy: loadingstrategy
});

let types = [
    { type: 'Elinympäristökunnostus', color: '#8dd3c7' },
    { type: 'Hapettaminen', color: '#ffffb3' },
    { type: 'Hoitokalastus', color: '#bebada' },
    { type: 'Järven nosto', color: '#fb8072' },
    { type: 'Kalataloudellinen kunnostus', color: '#80b1d3' },
    { type: 'Kalataloudellinen kunnostus, valuma-aluekunnostus', color: '#fdb462' },
    { type: 'Kalatie', color: '#b3de69' },
    { type: 'Kosteikko', color: '#fccde5' },
    { type: 'Lintuvesikunnostus', color: '#d9d9d9' },
    { type: 'Pato', color: '#bc80bd' },
    { type: 'Ruoppaus', color: '#ccebc5' },
    { type: 'Tierumpu', color: '#ffed6f' },
    { type: 'Valuma-aluekunnostus', color: '#1f78b4' },
    { type: 'Vesialueen täyttö, rantaviivan muotoilu', color: '#b2df8a' },
    { type: 'Vesikasvillisuuden mekaaninen vähentäminen', color: '#33a02c' }
];

let style = feature => {

    let fill = new Fill({color: types.find(type => type.type === feature.get('tyyppi') ).color});

    return new Style({
        image: new Circle({
            radius: 8,
            fill: fill
        })
    })
};

const Vesty = new VectorLayer({
    source: source,
    name: 'Kunnostustoimenpiteet',
    title: 'Kunnostustoimenpiteet',
    visible: true,
    style: style,
    description: 'Tämä karttataso on kopio VESTY-tietokannasta ja kuvaa vesistöjen kunnostustoimenpiteitä.'
});

export default Vesty;