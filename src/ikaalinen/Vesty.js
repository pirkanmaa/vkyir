import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import GeoJSON from 'ol/format/geojson';
import loadingstrategy from 'ol/loadingstrategy';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import Fill from 'ol/style/fill';
import Feature from 'ol/feature';

const url = 'https://tieto.pirkanmaa.fi/geoserver/maankaytto/ows?service=WFS&version=1.0.0&request=GetFeature',
    layer = 'maankaytto:vesty',
    proj = 'EPSG:3857',
    format = 'application/json';

const source = new VectorSource({
    format: new GeoJSON(),
    url: (extent) => {
        return `${url}&typename=${layer}&outputFormat=${format}&srsname=${proj}&bbox=${extent.join(',')},${proj}`
    },
    strategy: loadingstrategy.bbox
});

const Vesty = new VectorLayer({
    source: source,
    name: 'Vesty',
    title: 'Vesty',
    visible: false,
    style: new Style({
        fill: new Fill({
          color: '#FFFFFF',
          opacity: '1'
        }),
        stroke: new Stroke({
          color: '#A060C0',
          width: 3
        })
      }),
});

export default Vesty;