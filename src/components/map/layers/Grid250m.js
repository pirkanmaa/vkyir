import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import GeoJSON from 'ol/format/geojson';
import loadingstrategy from 'ol/loadingstrategy';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import Fill from 'ol/style/fill';

const url = 'https://www.ubigu.fi/geoserver/ubigu/wfs?service=WFS&request=GetFeature',
    layer = 'ubigu:typology',
    proj = 'EPSG%3A3857',
    format = 'json';

const source = new VectorSource({
    format: new GeoJSON(),
    url: `${url}&typeName=${layer}&outputFormat=${format}&srsName=${proj}`,
    strategy: loadingstrategy.all
});

let style = feature => {
    let fill;
    let category = feature.get('typology');
    switch (category) {
        case 'Rural area':
            fill = new Fill({ color: 'rgba(113, 153, 89, 0.75)' }); break;
        case 'Rural area near urban center':
            fill = new Fill({ color: 'rgba(218, 158, 108, 0.75)' }); break;
        case 'Suburb':
            fill = new Fill({ color: 'rgba(97, 97, 97, 0.75)' }); break;
        case 'City core':
            fill = new Fill({ color: 'rgba(115, 4, 3, 0.75)' }); break;
        case 'Suburb fringe area':
            fill = new Fill({ color: 'rgba(230, 95, 95, 0.75)' }); break;
        case 'Local center in a rural area':
            fill = new Fill({ color: 'rgba(153, 119, 203, 0.75)' }); break;
    }
    return new Style({
        fill: fill
    });
}

const Grid250m = new VectorLayer({
    source: source,
    title: 'Urban-rural typology',
    name: 'Urban-rural typology',
    visible: true,
    style: style
});

export default Grid250m;