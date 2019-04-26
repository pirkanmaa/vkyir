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
  "https://services.arcgis.com/eOoJrX8K8DfwR6Ct/arcgis/rest/services/KotomaIkaalistenReitti/FeatureServer/";

var layer = "0";

var esrijsonFormat = new EsriJSON();

let style = feature => {
  const { PohjavTxt } = feature.values_;

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
  Palsta sijaitsee pohjaveden muodostumisalueella -> rgba( 0,0,204,0.22 ) / #0000cc
  Palsta sijaitsee pohjavesialueella -> rgba( 115, 178, 255, 1.00 ) / #73b2ff  
  */

  switch (PohjavTxt) {
    case "Palsta sijaitsee pohjaveden muodostumisalueella":
      baseStyle.setFill(new Fill({ color: "rgba(0,0,204,0.50)" }));
      baseStyle.setStroke(
        new Stroke({ color: "rgba(110,110,110, 0.66)", width: 1 })
      );
      break;
    case "Palsta sijaitsee pohjavesialueella":
      baseStyle.setFill(new Fill({ color: "rgba(115, 178, 255,0.22)" }));
      baseStyle.setStroke(
        new Stroke({
          color: "rgba(110,110,110, 0.66)",
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

const Peltolohkotpohjavesialueella = new VectorLayer({
  source: vectorSource,
  name: "Peltolohkot pohjavesialueella",
  title: "Peltolohkot pohjavesialueella",
  visible: false,
  style: style,
  group: "Maatalouden vesiensuojelutoimenpiteet, KOTOMA",
  description: `Peltolohkot pohjavesialueella<br>
  KOTOMA paikkatietoanalyysissa huomioitu peltolohkojen sijainti pohjavesialueella Ikaalisten reitin alueella. Aineisto kuvaa peltolohkon sijaintia kokonaan tai osittain pohjavesialueelle tai pohjaveden muodostumisalueelle.<br>
  Huomioitava aineistoa tulkittaessa! Aineisto on suuntaa antava. Analyysissä, jossa aineisto on tuotettu, tulee aina koko peltolohko luokitetuksi tiettyyn luokkaan, jos jokin osa peltolohkosta täyttää analyysissä käytettävät kriteerit.`
});

export default Peltolohkotpohjavesialueella;
