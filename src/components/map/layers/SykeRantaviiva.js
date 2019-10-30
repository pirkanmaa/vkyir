import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import EsriJSON from "ol/format/EsriJSON.js";
import { tile as tileStrategy } from "ol/loadingstrategy.js";
import { createXYZ } from "ol/tilegrid.js";

import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";

//Spatial Reference: 102139  (3067)

/* VEMALA Peltokuorma Kg/Km2/v 12/2018 IKAALINEN */

var serviceUrl =
  "https://paikkatieto.ymparisto.fi/arcgis/rest/services/SYKE/SYKE_Rantaviiva/MapServer/";

var layer = "3";

var esrijsonFormat = new EsriJSON();
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

const SykeRantaviiva = new VectorLayer({
  source: vectorSource,
  name: "Järvet",
  title: "Järvet",
  visible: false,
  style: new Style({
    fill: new Fill({
      color: "rgba(125,157,255,0.8)"
    }),
    stroke: new Stroke({
      color: "rgba(125, 157, 255, 1)",
      width: 1
    })
  }),
  group: "Vesien tila",
  description: `Aineisto pohjautuu Maanmittauslaitoksen maastotietokannan vuosien 2000-2008 aineistoon (1:5 000-1:10 000). Maastotietokannan vesiin sisältyvistä kohteista mukaan on otettu alueina vakavedet sekä yli 5 m leveät virtavedet. Lisäksi mukana on maastotietokannan yli 200 m2:n kokoisia altaita. Viivoina kuvatuista alle 5 m leveistä virtavesistä on mukana vesistön päävirtausreitit sisältäen sekä 2-5 m leveitä että alle 2 m leveitä virtavesiä. Aineisto on uudelleen luokiteltu ja topologialtaan tarkistettu SYKEssä. Aineiston pohjalta on SYKEssä luotu uomia kuvaava uomaverkosto, jonka verkostomainen rakenne on tuotettu lisäämällä viivamaisiin jokiin aluemaisten jokien keskilinjat sekä järvien ylitykset ns. pseudouomilla. Aineistoon on lisätty myös järvi- ja uomatunnukset. `
});

export default SykeRantaviiva;
