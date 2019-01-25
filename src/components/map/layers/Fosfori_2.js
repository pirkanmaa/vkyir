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

var layer = "2";

var esrijsonFormat = new EsriJSON();

let style = feature => {
  const { Metsa_P_Kg_Km2_v } = feature.values_;

  let baseStyle = new Style({
    fill: new Fill({
      color: "rgba(192,192,192,0)"
    }),
    stroke: new Stroke({
      color: "rgba(0, 0, 0, 0)",
      width: 1
    })
  });

  /*
  0,01 - 1,5 -> rgba( 211, 255, 191, 1.00 )
  1,51 - 3 -> rgba( 156, 219, 125, 1.00 )
  3 - 4,5 -> rgba( 108, 184, 70, 1.00 )
  4,5 - 6 -> rgba( 68, 148, 28, 1.00 )
  6 - 17,8 -> rgba( 38, 115, 0, 1.00 ) */

  switch (Metsa_P_Kg_Km2_v) {
    case "0,01 - 1,5":
      baseStyle.setFill(new Fill({ color: "rgba(211, 255, 191,0.22)" }));
      baseStyle.setStroke(
        new Stroke({ color: "rgba(211, 255, 191, 0.66)", width: 1 })
      );
      break;
    case "1,51 - 3":
      baseStyle.setFill(new Fill({ color: "rgba(156, 219, 125,0.22)" }));
      baseStyle.setStroke(
        new Stroke({
          color: "rgba(156, 219, 125, 0.66)",
          width: 1
        })
      );
      break;
    case "3 - 4,5":
      baseStyle.setFill(new Fill({ color: "rgba(108, 184, 70,0.22)" }));
      baseStyle.setStroke(
        new Stroke({
          color: "rgba(108, 184, 70, 0.66)",
          width: 1
        })
      );
      break;
    case "4,5 - 6":
      baseStyle.setFill(new Fill({ color: "rgba(68, 148, 28,0.22)" }));
      baseStyle.setStroke(
        new Stroke({
          color: "rgba(68, 148, 28, 0.66)",
          width: 1
        })
      );
      break;
    case "6 - 17,8":
      baseStyle.setFill(new Fill({ color: "rgba(38, 115, 0,0.22)" }));
      baseStyle.setStroke(
        new Stroke({
          color: "rgba(38, 115, 0, 0.66)",
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

const Fosforit_metsakuorma = new VectorLayer({
  source: vectorSource,
  name: "Metsakuorma [Kg/Km2/v] 12/2018",
  title: "Metsakuorma [Kg/Km2/v] 12/2018",
  visible: false,
  style: style,
  description: `Metsakuorma [Kg/Km2/v] 12/2018.`
});

export default Fosforit_metsakuorma;
