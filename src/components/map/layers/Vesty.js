import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import GeoJSON from 'ol/format/geojson';
import loadingstrategy from 'ol/loadingstrategy';

import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import Fill from 'ol/style/fill';
import Circle from 'ol/style/circle';

const url = 'https://tieto.pirkanmaa.fi/geoserver/maankaytto/ows?service=WFS&version=1.0.0&request=GetFeature',
    layer = 'maankaytto:vestydemo',
    proj = 'EPSG:3857',
    format = 'application/json';

const source = new VectorSource({
    format: new GeoJSON(),
    url: `${url}&typename=${layer}&srsname=${proj}&outputFormat=${format}`,
    strategy: loadingstrategy.all
});

let style = feature => {
    let fill;
    let category = feature.get('tyyppi');
    switch (category) {
        case 'Vesikasvillisuuden mekaaninen vähentäminen':
            fill = new Fill({ color: 'rgba(113, 153, 89, 0.8)' }); break;
        case 'Ruoppaus':
            fill = new Fill({ color: 'rgba(218, 158, 108, 0.8)' }); break;
        case 'Ravintoketjukunnostus':
            fill = new Fill({ color: 'rgba(97, 97, 97, 0.8)' }); break;
        case 'Penger':
            fill = new Fill({ color: 'rgba(115, 4, 3, 0.8)' }); break;
        case 'Pato':
            fill = new Fill({ color: 'rgba(230, 95, 95, 0.8)' }); break;
        case 'Määrittelemätön toimenpide':
            fill = new Fill({ color: 'rgba(153, 119, 203, 0.8)' }); break;
        case 'Järven nosto':
            fill = new Fill({ color: 'rgba(75, 100, 100, 0.8)' }); break;
        case 'Hapettaminen':
            fill = new Fill({ color: 'rgba(25, 60, 100, 0.8)' }); break;
    }
    return new Style({
        image: new Circle({
            radius: 8,
            fill: fill
        })
    })
};

const Vesty = new VectorLayer({
    source: source,
    name: 'Vesty',
    title: 'Vesty',
    visible: true,
    style: style
});

export default Vesty;