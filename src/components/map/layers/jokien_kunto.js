import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import EsriJSON from "ol/format/EsriJSON.js";
import { tile as tileStrategy } from "ol/loadingstrategy.js";
import { createXYZ } from "ol/tilegrid.js";

import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";

//Spatial Reference: 102139  (3067)

//"https://services.arcgis.com/eOoJrX8K8DfwR6Ct/arcgis/rest/services/VemalaKuormitusFosforiIKAALINEN/FeatureServer/";
var serviceUrl =
  "https://paikkatieto.ymparisto.fi/arcgis/rest/services/SYKE/SYKE_PintavesienEkologinenTila/MapServer/";

var layer = "1";

var esrijsonFormat = new EsriJSON();

let style = feature => {
  //console.log(feature);
  const { EkolTila } = feature.values_;

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
  "Erinomainen" -> rgba( 0, 0, 255, 1.00 ) #0000FF
  "Hyvä" -> rgba( 0, 255, 0, 1.00 ) #00FF00
  "Tyydyttävä" -> rgba( 255, 255, 0, 1.00 ) #FFFF00
  "Välttävä" -> rgba( 242, 148, 0, 1.00 ) #F29400
  "Huono" -> rgba( 237, 25, 36, 1.00 ) #ED1924
  "Ekologinen luokittelu puuttuu" -> rgba( 171, 167, 181, 1.00 ) #ABA7B5
  */
  switch (EkolTila) {
    case "Erinomainen":
      baseStyle.setFill(new Fill({ color: "rgba(0, 0, 255,0.22)" }));
      baseStyle.setStroke(
        new Stroke({ color: "rgba(0, 0, 255, 0.66)", width: 1 })
      );
      break;
    case "Hyvä":
      baseStyle.setFill(new Fill({ color: "rgba(0, 255, 0,0.22)" }));
      baseStyle.setStroke(
        new Stroke({ color: "rgba(0, 255, 0, 0.66)", width: 1 })
      );
      break;
    case "Tyydyttävä":
      baseStyle.setFill(new Fill({ color: "rgba(255, 255, 0,0.22)" }));
      baseStyle.setStroke(
        new Stroke({ color: "rgba(255, 255, 0, 0.66)", width: 1 })
      );
      break;
    case "Välttävä":
      baseStyle.setFill(new Fill({ color: "rgba(242, 148, 0,0.22)" }));
      baseStyle.setStroke(
        new Stroke({ color: "rgba(242, 148, 0, 0.66)", width: 1 })
      );
      break;
    case "Huono":
      baseStyle.setFill(new Fill({ color: "rgba(237, 25, 36,0.22)" }));
      baseStyle.setStroke(
        new Stroke({ color: "rgba(237, 25, 36, 0.66)", width: 1 })
      );
      break;
    case "Ekiloginen luokittelu puuttuu":
      baseStyle.setFill(new Fill({ color: "rgba(171, 167, 181,0.22)" }));
      baseStyle.setStroke(
        new Stroke({ color: "rgba(171, 167, 181, 0.66)", width: 1 })
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

const JokienKunto = new VectorLayer({
  source: vectorSource,
  name: "Jokien kunto",
  title: "Jokien kunto",
  visible: false,
  style: style,
  description: `Aineisto kuvaa vesipuitedirektiivin mukaisten pintavesimuodostumien ekologista tilaa vuonna 2016.<br> Vesipuitedirektiivin (Euroopan parlamentin ja neuvoston direktiivi 2000/60/EY, 23.10.2000 ) mukaisella pintavesimuodostumalla tarkoitetaan pintavesien erillistä ja merkittävää osaa, kuten järveä, tekoallasta, puroa, jokea tai kanavaa, puron, joen tai kanavan osaa, jokisuun vaihettumisaluetta tai rannikkovesien osaa. <br>Pintavedet jaotellaan vesienhoidon järjestämiseksi maantieteellisten ja luonnontieteellisten ominaispiirteiden mukaan tyyppeihin. Pintavedet voidaan nimetä tietyin edellytyksin keinotekoisiksi tai voimakkaasti muutetuiksi. Pintavesimuodostumat kuuluvat johonkin seuraavista jaotteluryhmistä: järvi, joki ja rannikkovesi. Tämä paikkatietoaineisto on vesipuitedirektiivin 2. suunnittelukauden EU:lle raportoitu tulos.`
});

export default JokienKunto;
