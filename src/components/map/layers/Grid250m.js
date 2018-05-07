import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import GeoJSON from 'ol/format/geojson';
import loadingstrategy from 'ol/loadingstrategy';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';

const url = 'https://ubigu.fi/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature',
    layer = 'ubigu:grid250m',
    proj = 'EPSG:3044',
    format = 'application/json';

const source = new VectorSource({
    format: new GeoJSON(),
    url: (extent) => {
        return `${url}&typename=${layer}&outputFormat=${format}&srsname=${proj}`
    },
    strategy: loadingstrategy.all
});

const Grid250m = new VectorLayer({
    source: source,
    title: 'Grid250m',
    name: 'Grid250m',
    visible: true,
    style: new Style({
        stroke: new Stroke({
            color: '#A060C0',
            width: 1
        })
    })
});

export default Grid250m;