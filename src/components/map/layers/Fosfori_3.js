import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import EsriJSON from "ol/format/EsriJSON.js";
import { tile as tileStrategy } from "ol/loadingstrategy.js";
import { createXYZ } from "ol/tilegrid.js";

import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";

//Spatial Reference: 102139  (3067)

/* VEMALA Metsakuorma Kg/Km2/v 12/2018 IKAALINEN */

var serviceUrl =
  "https://services.arcgis.com/eOoJrX8K8DfwR6Ct/arcgis/rest/services/VemalaKuormitusFosforiIKAALINEN/FeatureServer/";

var layer = "3";

var esrijsonFormat = new EsriJSON();

let style = feature => {
  const { PeltoPKg_Km2 } = feature.values_;

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
  0,01 - 10 -> rgba( 255, 255, 191, 1.00 ) #ffffbf
  10,01 - 20 -> rgba( 237, 231, 142, 1.00 ) #ede78e
  20,01 - 40 -> rgba( 219, 203, 99, 1.00 ) #dbcb63
  40,01 - 60 -> rgba( 201, 173, 60, 1.00 ) #c9ad3c
  60,01 - 80-> rgba( 184, 142, 28, 1.00 ) #b88e1c
  80,01 - 117,07-> rgba( 168, 112, 0, 1.00 ) #a87000
  PeltoPKg_Km2
  */
  switch (PeltoPKg_Km2) {
    case "0,01 - 10":
      baseStyle.setFill(new Fill({ color: "rgba(255, 255, 191,0.22)" }));
      baseStyle.setStroke(
        new Stroke({ color: "rgba(255, 255, 191, 0.66)", width: 1 })
      );
      break;
    case "10,01 - 20":
      baseStyle.setFill(new Fill({ color: "rgba(237, 231, 142,0.22)" }));
      baseStyle.setStroke(
        new Stroke({
          color: "rgba(237, 231, 142, 0.66)",
          width: 1
        })
      );
      break;
    case "20,01 - 40":
      baseStyle.setFill(new Fill({ color: "rgba(219, 203, 99,0.22)" }));
      baseStyle.setStroke(
        new Stroke({
          color: "rgba(219, 203, 99, 0.66)",
          width: 1
        })
      );
      break;
    case "40,01 - 60":
      baseStyle.setFill(new Fill({ color: "rgba(40,01 - 60,0.22)" }));
      baseStyle.setStroke(
        new Stroke({
          color: "rgba(40,01 - 60, 0.66)",
          width: 1
        })
      );
      break;
    case "60,01 - 80":
      baseStyle.setFill(new Fill({ color: "rgba(184, 142, 28,0.22)" }));
      baseStyle.setStroke(
        new Stroke({
          color: "rgba(184, 142, 28, 0.66)",
          width: 1
        })
      );
      break;
    case "80,01 - 117,07":
      baseStyle.setFill(new Fill({ color: "rgba(168, 112, 0,0.22)" }));
      baseStyle.setStroke(
        new Stroke({
          color: "rgba(168, 112, 0, 0.66)",
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

const Fosforit_peltokuorma = new VectorLayer({
  source: vectorSource,
  name: "Peltokuorma [Kg/Km2/v] 12/2018",
  title: "Peltokuorma [Kg/Km2/v] 12/2018",
  visible: false,
  style: style,
  description: `Peltokuorma [Kg/Km2/v] 12/2018.`
});

export default Fosforit_peltokuorma;
