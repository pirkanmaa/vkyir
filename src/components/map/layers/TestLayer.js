import VectorTile from 'ol/layer/vectortile';
import VectorTileSource from 'ol/source/vectortile';
import WMTSCapabilities from 'ol/format/wmtscapabilities';
import WMTS from 'ol/source/wmts';
import MVT from 'ol/format/mvt';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import Fill from 'ol/style/fill';
import tilegrid from 'ol/tilegrid';
import Circle from 'ol/style/circle';

let baseURL = 'https://tieto.pirkanmaa.fi/geoserver/gwc/service/tms/1.0.0/'
let layer = 'maankaytto:vesty';
let proj_epsg = 'EPSG:900913';
let format = 'pbf'

let TestLayer = new VectorTile({

  style: new Style({
    image: new Circle({
      radius: 5,
      fill: new Fill({
        color: '#FFFFFF'
      }),
      stroke: new Stroke({
        color: '#A060C0',
        width: 2
      })
    })
  }),
  source: new VectorTileSource({
    url: `${baseURL}${layer}@${proj_epsg}@${format}/{z}/{x}/{-y}.${format}`,
    format: new MVT(),
    //tilePixelRatio: 1,
    //tileGrid: tilegrid.createXYZ({maxZoom: 19})
  })
})

export default TestLayer;