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

var layer = "0";

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
  VEMALA_MetsakuormaKg_Km2_v_05_2019_IKAALINEN (0)
  VEMALA_PeltokuormaKg_Km2_v_05_2019_IKAALINEN (1)
  VEMALA_PistekuormaKg_v_05_2019_IKAALINEN (2)
  VEMALA_PitoisuusP_ug_l_05_2019_IKAALINEN (3)


  Metsäkuormitus Fosfori (Fosforikuormitus (kg/km2/v)
  0,01-1,5 #e6f9ff #e6f9ff -> rgb(230,249,255)
  1,51-3 #0099cc #0099cc -> rgb(0,153,204) 
  3-4,5 #bf80ff #bf80ff -> rgb(191,128,255)
  4,5-6 #5900b3 #5900b3 -> rgb(89,0,179) 
  6-17,8 #993333 #993333 -> rgb(153,51,51) 
 */

  switch (Metsa_P_Kg_Km2_v) {
    case "0,01 - 1,5":
      baseStyle.setFill(new Fill({ color: "rgba(230,249,255,0.22)" }));
      baseStyle.setStroke(
        new Stroke({ color: "rgba(230,249,255, 0.66)", width: 1 })
      );
      break;
    case "1,51 - 3":
      baseStyle.setFill(new Fill({ color: "rgba(0,153,204,0.22)" }));
      baseStyle.setStroke(
        new Stroke({
          color: "rgba(0,153,204, 0.66)",
          width: 1
        })
      );
      break;
    case "3,01 - 4,5":
      baseStyle.setFill(new Fill({ color: "rgba(191,128,255,0.22)" }));
      baseStyle.setStroke(
        new Stroke({
          color: "rgba(191,128,255, 0.66)",
          width: 1
        })
      );
      break;
    case "4,51 - 6":
      baseStyle.setFill(new Fill({ color: "rgba(89,0,179,0.22)" }));
      baseStyle.setStroke(
        new Stroke({
          color: "rgba(89,0,179, 0.66)",
          width: 1
        })
      );
      break;
    case "6,01 - 17,8":
      baseStyle.setFill(new Fill({ color: "rgba(153,51,51,0.22)" }));
      baseStyle.setStroke(
        new Stroke({
          color: "rgba(153,51,51, 0.66)",
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
  name: "Metsäkuormitus, Fosfori",
  title: "Metsäkuormitus, Fosfori",
  visible: false,
  style: style,
  group: "Kuormitus",
  description: `
  VEMALA-malli laskee alueella syntyvän, alueelle tulevan ja alueelta lähtevän kuormituksen arvoja peltoviljelylle, luonnonhuuhtoumalle pelloilta ja metsistä, metsätaloudelle (hakkuut, lannoitus, kunnostusojitus ja vanhat ojitetut suo), haja-asutukselle (vakituinen ja loma-asutus), hulevesille, laskeumalle sekä pistekuormitukselle. Hydrologiset arvot saadaan WSFS-vesistömallista, jonka jälkeen VEMALA laskee kuormituksen syntymistä maa-alueilta (pellot/muu alue), lisää eri lähteistä saatavia kuormitustietoja (haja-asutus, pistekuormitus, laskeuma, turvetuotanto) ja lopulta kuormituksen etenemisen ja pidättymisen vesistössä (sekoittuminen, sedimentoituminen, eroosio). Näiden laskennallisten tietojen avulla muodostuu laskennallinen pitoisuus järvissä tai uomissa esim. fosforipitoisuus.
  <br>Metsätalouden kuormitus kuvaa kussakin 4. jakovaiheen alueella syntyvää suhteellista vuosittaista kuormitusta maapinta-alaan nähden, kg/km2/v.
  <br>Kaikki kuormitus- ja pitoisuusarvot perustuvat mallinnukseen eli vaikka malli pääosin tuottaakin melko luotettavia arvoja, niin poikkeustapauksissa tulokset saattavat erota paljonkin todellisuudesta. Tämän vuoksi on syytä tehdä alustava asiantuntija-arvio tulosten oikeellisuudesta.`
});

export default Fosforit_metsakuorma;
