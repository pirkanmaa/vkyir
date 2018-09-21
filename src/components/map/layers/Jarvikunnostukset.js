import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { all as loadingstrategy } from 'ol/loadingstrategy';

import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';

const url = 'https://tieto.pirkanmaa.fi/geoserver/pirely/ows?service=WFS&version=1.0.0&request=GetFeature',
    layer = 'pirely:Jarvikunnostukset_Ikaalisten_Reitti',
    proj = 'EPSG:3067',
    format = 'application/json';

const source = new VectorSource({
    format: new GeoJSON(),
    url: `${url}&typename=${layer}&srsname=${proj}&outputFormat=${format}`,
    strategy: loadingstrategy
});

let style = feature => {
    return new Style({
        fill: new Fill({
            color: 'rgba(69, 150, 216, 0.33)'
        }),
        stroke: new Stroke({
            color: 'rgba(69, 150, 216, 0.66)',
            width: 1
        })
    })
};

const Jarvikunnostukset = new VectorLayer({
    source: source,
    name: 'Järvikunnostukset',
    title: 'Järvikunnostukset',
    visible: false,
    style: style,
    description: `Kartalla esitetyt vesistöjen kunnostuskohteet ovat esimerkkejä suunnitelluista ja toteutuneista kunnostuksista järvillä, joilla ja niiden valuma-alueilla. Kohteista löytyvät kuvaukset, kuten mitä on tehty, kuka on tehnyt ja rahoittanut sekä mikä on hankkeen toteutusvaihe.`
});

export default Jarvikunnostukset;