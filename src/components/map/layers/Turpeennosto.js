import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import EsriJSON from "ol/format/EsriJSON.js";
import { tile as tileStrategy } from "ol/loadingstrategy.js";
import { createXYZ } from "ol/tilegrid.js";

import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";

//Spatial Reference: 102139  (3067)
/* TurpeenottosuotPirkanmaa */
var serviceUrl =
  "https://services.arcgis.com/eOoJrX8K8DfwR6Ct/arcgis/rest/services/TurpeenottosuotPirkanmaa/FeatureServer/";

var layer = "0";

var esrijsonFormat = new EsriJSON();

let style = feature => {
  let baseStyle = new Style({
    fill: new Fill({
      color: "rgba(0,0,0,0)"
    }),
    stroke: new Stroke({
      color: "rgba(115, 38, 0, 1)",
      width: 3
    })
  });

  return baseStyle;
};

const vectorSource = new VectorSource({
  loader: function(extent, resolution, projection) {
    var url =
      serviceUrl +
      layer +
      "/query/?f=json&" +
      "returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=" +
      encodeURIComponent(
        '{"xmin":' +
          extent[0] +
          ',"ymin":' +
          extent[1] +
          ',"xmax":' +
          extent[2] +
          ',"ymax":' +
          extent[3] +
          ',"spatialReference":{"wkid":102139}}'
      ) +
      "&geometryType=esriGeometryEnvelope&inSR=102139&outFields=*" +
      "&outSR=102139";

    fetch(url)
      .then(response => response.text())
      .then(response => {
        var features = esrijsonFormat.readFeatures(response, {
          featureProjection: projection
        });
        if (features.length > 0) {
          vectorSource.addFeatures(features);
        }
      })
      .catch(err => console.log(err));
  },
  strategy: tileStrategy(
    createXYZ({
      tileSize: 512
    })
  )
});

const Turpeenotto = new VectorLayer({
  source: vectorSource,
  name: "Turpeenottosuot Pirkanmaa ",
  title: "Turpeenottosuot Pirkanmaa ",
  visible: false,
  style: style,
  group: "Muu",
  description: `Maastotietokannan suot, joilla tehdään turpeenottoa Pirkanmaan alueella. <br>Kyseessä on ympäristöluvanvarainen turpeenotto. Tieto pohjautuu ympäristölupavalvonnan tietojärjestelmän tietoihin ja maanmittauslaitoksen maastotietokantaan. `
});

export default Turpeenotto;
