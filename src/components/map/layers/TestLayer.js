import VectorTileLayer from 'ol/layer/vectortile';
import VectorTileSource from 'ol/source/vectortile';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import WFS from 'ol/format/wfs';
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
import replacer from './../utils/replacer';
import loadingstrategy from 'ol/loadingstrategy';
import VectorTile from '@mapbox/vector-tile';
import Protobuf from 'pbf';

let url = 'https://tieto.pirkanmaa.fi/geoserver/maankaytto/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=maankaytto:Pirkanmaan_ekosysteemipalvelut&srsName=EPSG%3A900913&outputFormat=application%2Fjson';

// WFS Request 
let request = new WFS().writeGetFeature({
  srsName: 'EPSG:900913',
  featureTypes: ['Pirkanmaan_ekosysteemipalvelut'],
  outputFormat: 'application/json',
});

let tilePixels = new Projection({
  code: 'TILE_PIXELS',
  units: 'tile-pixels'
});
/*
let GJVTTestLayer = new VectorTileLayer({
  source: new VectorTileSource({
    format: new GeoJSON(),
    tileLoadFunction: function (tile) {
      tile.setLoader(function () {
        fetch('https://openlayers.org/en/v4.6.4/examples/data/geojson/countries.geojson').then(function (response) {
          return response.json();
        }).then(function (json) {
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
            }, replacer));

          tile.setFeatures(features);
          tile.setProjection(tilePixels);
        });
      })
    },
    url: 'data:' // arbitrary url, we don't use it in the tileLoadFunction
  })
});
*/
/* GeoJSON-VT EXAMPLE */
let GJVTTestLayer = () => {
  return fetch('https://tieto.pirkanmaa.fi/geoserver/maankaytto/wfs?service=WFS&version=1.1.0&request=GetFeature&srsName=EPSG:900913&typeName=maankaytto:Pirkanmaan_ekosysteemipalvelut&outputFormat=application%2Fjson').then(response => response.json()
  ).then(json => {
    let tileIndex = geojsonvt(json);
    let vectorSource = new VectorTileSource({
      url: 'data:',
      format: new GeoJSON(),
      tileLoadFunction: function (tile) {
        let format = tile.getFormat();
        let tileCoord = tile.getTileCoord();
        let data = tileIndex.getTile(tileCoord[0], tileCoord[1], -tileCoord[2] - 1);

        let features = format.readFeatures(
          JSON.stringify({
            type: 'FeatureCollection',
            features: data ? data.features : []
          }, replacer));
        tile.setLoader(() => {
          tile.setFeatures(features);
          tile.setProjection(tilePixels);
        });
      }
    });
    return new VectorTileLayer({
      source: vectorSource
    });
  })
}

/* VECTOR TILE EXAMPLE */
let baseURL = 'https://tieto.pirkanmaa.fi/geoserver/gwc/service/tms/1.0.0/',
  layer = 'maankaytto:Pirkanmaan_ekosysteemipalvelut',
  proj_epsg = 'EPSG:900913',
  format = 'pbf',
  type = 'pbf';

let VTTestLayer = new VectorTileLayer({

  style: new Style({
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
    format: new MVT({ featureClass: Feature })
    //tilePixelRatio: 1,
    //tileGrid: tilegrid.createXYZ({maxZoom: 19})
  })
})

/* GeoJSON layer example */

let GJTestLayer = new VectorLayer({
  renderMode: 'image',
  source: new VectorSource({
    loader: () => {
      fetch('https://tieto.pirkanmaa.fi/geoserver/maankaytto/ows?', {
        method: 'POST',
        body: new XMLSerializer().serializeToString(request)
      }).then(response => {
        return response.json();
      }).then(json => {
        let features = new GeoJSON().readFeatures(json);
        GJTestLayer.getSource().addFeatures(features);
      });
    }
  })
});

export { VTTestLayer, GJTestLayer, GJVTTestLayer };