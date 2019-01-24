import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import EsriJSON from "ol/format/EsriJSON.js";
import { tile as tileStrategy } from "ol/loadingstrategy.js";
import { createXYZ } from "ol/tilegrid.js";

import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";

//Spatial Reference: 102139  (3067)

/* Pistekuorma Kg/v 12/2018 */

var serviceUrl =
  "https://services.arcgis.com/eOoJrX8K8DfwR6Ct/arcgis/rest/services/VemalaKuormitusFosforiIKAALINEN/FeatureServer/";

var layer = "0";

var esrijsonFormat = new EsriJSON();

let style = feature => {
  const { PisteK_P_Kg_v } = feature.values_;

  let baseStyle = new Style({
    fill: new Fill({
      color: "rgba(192,192,192,0.22)"
    }),
    stroke: new Stroke({
      color: "rgba(0, 0, 0, 0.66)",
      width: 1
    })
  });

  /*
  0,01 - 16 -> rgba( 76, 230, 0, 1.00 )
  16,01 - 70 -> rgba( 255, 255, 0, 1.00 )
  70,01 - 279 -> rgba( 255, 0, 0, 1.00 )
  */

  switch (PisteK_P_Kg_v) {
    case "0,01 - 16":
      baseStyle.setFill(new Fill({ color: "rgba(76, 230, 0,0.22)" }));
      baseStyle.setStroke(
        new Stroke({ color: "rgba(76, 230, 0, 0.66)", width: 1 })
      );
      break;
    case "16,01 - 70":
      baseStyle.setFill(new Fill({ color: "rgba(255, 255, 0,0.22)" }));
      baseStyle.setStroke(
        new Stroke({
          color: "rgba(255, 255, 0, 0.66)",
          width: 1
        })
      );
      break;
    case "70,01 - 279":
      baseStyle.setFill(new Fill({ color: "rgba(255, 0, 0,0.22)" }));
      baseStyle.setStroke(
        new Stroke({
          color: "rgba(255, 0, 0, 0.66)",
          width: 1
        })
      );
      break;
  }

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

const Fosforit_pistekuorma = new VectorLayer({
  source: vectorSource,
  name: "Pistekuorma Kg/v 12/2018",
  title: "Pistekuorma Kg/v 12/2018",
  visible: false,
  style: style,
  description: `Pistekuorma Kg/v 12/2018 .`
});

export default Fosforit_pistekuorma;
