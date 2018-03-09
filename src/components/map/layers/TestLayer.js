import VectorTile from 'ol/layer/vectortile';
import VectorTileSource from 'ol/source/vectortile';
import MVT from 'ol/format/mvt';
//import TileGrid from 'ol/tilegrid/tilegrid';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import Fill from 'ol/style/fill';

let simpleStyle = new Style({
    fill: new Fill({
      color: '#ADD8E6'
    }),
    stroke: new Stroke({
      color: '#880000',
      width: 1
    })
  });

let TestLayer = new VectorTile({
    style: simpleStyle,
    source: new VectorTileSource({
        format: new MVT(),
        tilePixelRatio: 1,
        url: 'https://tieto.pirkanmaa.fi/geoserver/gwc/service/tms/1.0.0/maankaytto%3Avesty@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf'
    })
})

export default TestLayer;