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
  "https://services.arcgis.com/eOoJrX8K8DfwR6Ct/arcgis/rest/services/IkaalistenReittiLanta/FeatureServer/";

var layer = "0";

var esrijsonFormat = new EsriJSON();

let style = feature => {
  const { Lannanlevitys } = feature.values_;

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
  Kuiva- ja lietelannan levitys on sallittua -> rgba( 115,  178,  115, 1.00 ) / #73B273
  Lannan levitys ei ole sallittua -> rgba( 255,  0,  0, 1.00 ) / #FF0000
  Lietelannan levitys on sallittua -> rgba( 168,  168,  0, 1.00 ) / #A8A800
  */

  switch (Lannanlevitys) {
    case "Kuiva- ja lietelannan levitys on sallittua":
      baseStyle.setFill(new Fill({ color: "rgba(115,  178,  115,0.22)" }));
      baseStyle.setStroke(
        new Stroke({ color: "rgba(115,  178,  115, 0.66)", width: 1 })
      );
      break;
    case "Lannan levitys ei ole sallittua":
      baseStyle.setFill(new Fill({ color: "rgba(255,  0,  0,0.22)" }));
      baseStyle.setStroke(
        new Stroke({
          color: "rgba(255,  0,  0, 0.66)",
          width: 1
        })
      );
      break;
    case "Lietelannan levitys on sallittua":
      baseStyle.setFill(new Fill({ color: "rgba(168,  168,  0,0.22)" }));
      baseStyle.setStroke(
        new Stroke({
          color: "rgba(168,  168,  0, 0.66)",
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

const Lanta = new VectorLayer({
  source: vectorSource,
  name: "Lanta",
  title: "Lanta",
  visible: false,
  style: style,
  description: `
  VEMALA-malli laskee alueella syntyvän, alueelle tulevan ja alueelta lähtevän kuormituksen arvoja peltoviljelylle, luonnonhuuhtoumalle pelloilta ja metsistä, metsätaloudelle (hakkuut, lannoitus, kunnostusojitus ja vanhat ojitetut suo), haja-asutukselle (vakituinen ja loma-asutus), hulevesille, laskeumalle sekä pistekuormitukselle. Hydrologiset arvot saadaan WSFS-vesistömallista, jonka jälkeen VEMALA laskee kuormituksen syntymistä maa-alueilta (pellot/muu alue), lisää eri lähteistä saatavia kuormitustietoja (haja-asutus, pistekuormitus, laskeuma, turvetuotanto) ja lopulta kuormituksen etenemisen ja pidättymisen vesistössä (sekoittuminen, sedimentoituminen, eroosio). Näiden laskennallisten tietojen avulla muodostuu laskennallinen pitoisuus järvissä tai uomissa esim. fosforipitoisuus.
  <br>Metsätalouden kuormitus kuvaa kussakin 4. jakovaiheen alueella syntyvää suhteellista vuosittaista kuormitusta maapinta-alaan nähden, kg/km2/v.
  <br>Kaikki kuormitus- ja pitoisuusarvot perustuvat mallinnukseen eli vaikka malli pääosin tuottaakin melko luotettavia arvoja, niin poikkeustapauksissa tulokset saattavat erota paljonkin todellisuudesta. Tämän vuoksi on syytä tehdä alustava asiantuntija-arvio tulosten oikeellisuudesta.`
});

export default Lanta;
