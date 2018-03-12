import VectorTileLayer from 'ol/layer/vectortile';
import VectorTileSource from 'ol/source/vectortile';
//import WMTSCapabilities from 'ol/format/wmtscapabilities';
//import WMTS from 'ol/source/wmts';
import MVT from 'ol/format/mvt';
import tilegrid from 'ol/tilegrid';
import Style from 'ol/style/style';
import Projection from 'ol/proj/projection';
import Stroke from 'ol/style/stroke';
import Fill from 'ol/style/fill';
import Feature from 'ol/feature';
import Circle from 'ol/style/circle';
import GeoJSON from 'ol/format/geojson';
import geojsonvt from 'geojson-vt';
import Replacer from './../utils/replacer';
//import GeoJSONVectorTileSource from './../utils/olgeojsonvt';

let tilePixels = new Projection({
  code: 'TILE_PIXELS',
  units: 'tile-pixels'
});

let url = 'https://tieto.pirkanmaa.fi/geoserver/maankaytto/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=maankaytto:Pirkanmaan_ekosysteemipalvelut&outputFormat=application%2Fjson';

let baseURL = 'https://tieto.pirkanmaa.fi/geoserver/gwc/service/tms/1.0.0/',
  layer = 'maankaytto:Pirkanmaan_ekosysteemipalvelut',
  proj_epsg = 'EPSG:900913',
  format = 'pbf',
  type = 'pbf';

/*
let TestLayer = new VectorTileLayer({
  source: new GeoJSONVectorTileSource({
    data: fetch(url).then(response => {return response.json()})
  })
})
*/

/*
let TestLayer = new VectorTileLayer({
  source: new VectorTileSource({
    format: new GeoJSON(),
    loader: tile => {

      fetch(url).then(response => {
        return response.json();
      }).then(json => {

        let tileIndex = geojsonvt(json, {
          extent: 4096,
          debug: 1
        });

        let format = tile.getFormat();
        let tileCoord = tile.getTileCoord();
        let data = tileIndex.getTile(tileCoord[0], tileCoord[1], -tileCoord[2] - 1);

        let features = format.readFeatures(
          JSON.stringify({
            type: 'FeatureCollection',
            features: data ? data.features : []
          }, Replacer));

        tile.setLoader(() => {
          tile.setFeatures(features);
          tile.setProjection(tilePixels);
        });
      })
    }
  })
});
*/

let TestLayer = new VectorTileLayer({

  style: new Style({
    radius: 5,
    fill: new Fill({
      color: '#FFFFFF',
      opacity: '0.5'
    }),
    stroke: new Stroke({
      color: '#A060C0',
      width: 2
    })
  }),

  source: new VectorTileSource({
    url: `${baseURL}${layer}@${proj_epsg}@${format}/{z}/{x}/{-y}.${format}`,
    format: new MVT({ featureClass: Feature }),
    //tilePixelRatio: 1,
    //tileGrid: tilegrid.createXYZ({maxZoom: 19})
  })
})


export default TestLayer;