import VectorTileLayer from 'ol/layer/vectortile';
import VectorTileSource from 'ol/source/vectortile';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import WFS from 'ol/format/wfs';
import MVT from 'ol/format/mvt';
import tilegrid from 'ol/tilegrid';
import Style from 'ol/style/style';
import Projection from 'ol/proj/projection';
import Units from 'ol/proj/units';
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

const wfsUrl = 'https://tieto.pirkanmaa.fi/geoserver/maankaytto/ows?service=WFS&request=GetFeature',
  version = '1.0.0',
  format = 'json',
  tileUrl = 'https://tieto.pirkanmaa.fi/geoserver/gwc/service/tms/1.0.0/',
  layer = 'maankaytto:Pirkanmaan_ekosysteemipalvelut',
  proj_epsg = 'EPSG:900913',
  tileformat = 'pbf',
  type = 'pbf';

// WFS Request 
let request = new WFS().writeGetFeature({
  srsName: 'EPSG:900913',
  featureTypes: ['Pirkanmaan_ekosysteemipalvelut'],
  outputFormat: 'application/json',
});

var tilePixels = new Projection({
  code: 'TILE_PIXELS',
  units: 'tile-pixels'
});

/* GeoJSON-VT EXAMPLE -> jostain syystä ei renderöi*/
/* tällä testiurlilla kyllä tileä syntyy: 'https://openlayers.org/en/v4.6.4/examples/data/geojson/countries.geojson' */
const url = `${wfsUrl}&version=${version}&srsName=${proj_epsg}&typeName=${layer}&outputFormat=${format}`;
const GJVTTestLayer = () => {
  return fetch(url).then(response => response.json()
  ).then(json => {

    let tileIndex = geojsonvt(json, {
      extent: 4096,
      debug: 1
    });

    const vectorSource = new VectorTileSource({

      format: new GeoJSON(),
      tileGrid: tilegrid.createXYZ(),
      tilePixelRatio: 16,
      tileLoadFunction: (tile, tileCoord) => {

        let format = tile.getFormat();
        let data = tileIndex.getTile.apply(tileIndex, tileCoord);

        let features = format.readFeatures(
          JSON.stringify({
            type: 'FeatureCollection',
            features: data ? data.features : []
          }, replacer));

        tile.setLoader(() => {
          tile.setFeatures(features);
          tile.setProjection(tilePixels);
        });
      },
      tileUrlFunction: function(tileCoord) {
        return [tileCoord[0], tileCoord[1], -tileCoord[2] - 1];
      }
    });

    return new VectorTileLayer({

      style: new Style({
        fill: new Fill({
          color: '#666666',
          opacity: '0.5'
        }),
        stroke: new Stroke({
          color: '#A060C0',
          width: 2
        })
      }),

      source: vectorSource

    });
  })
}

/* VECTOR TILE EXAMPLE */
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
    url: `${tileUrl}${layer}@${proj_epsg}@${tileformat}/{z}/{x}/{-y}.${tileformat}`,
    format: new MVT({ featureClass: Feature })
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