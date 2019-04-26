import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { all as loadingstrategy } from "ol/loadingstrategy";

import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import Circle from "ol/style/Circle";
import { generateKeyPair } from "crypto";

const url =
    "https://tieto.pirkanmaa.fi/geoserver/pirely/ows?service=WFS&version=1.0.0&request=GetFeature",
  layer = "pirely:vesty",
  proj = "EPSG:3067",
  format = "application/json";

const source = new VectorSource({
  format: new GeoJSON(),
  url: `${url}&typename=${layer}&srsname=${proj}&outputFormat=${format}`,
  strategy: loadingstrategy
});

let types = [
  { type: "Elinympäristökunnostus", color: "#8dd3c7" },
  { type: "Hapettaminen", color: "#ffffb3" },
  { type: "Hoitokalastus", color: "#bebada" },
  { type: "Järven nosto", color: "#fb8072" },
  { type: "Kalataloudellinen kunnostus", color: "#80b1d3" },
  {
    type: "Kalataloudellinen kunnostus, valuma-aluekunnostus",
    color: "#fdb462"
  },
  { type: "Kalatie", color: "#b3de69" },
  { type: "Kalkitus", color: "#d19581" },
  { type: "Kosteikko", color: "#fccde5" },
  { type: "Lintuvesikunnostus", color: "#d9d9d9" },
  { type: "Pato", color: "#bc80bd" },
  { type: "Ruoppaus", color: "#ccebc5" },
  { type: "Tierumpu", color: "#ffed6f" },
  { type: "Valuma-aluekunnostus", color: "#1f78b4" },
  { type: "Vesialueen täyttö, rantaviivan muotoilu", color: "#b2df8a" },
  { type: "Vesikasvillisuuden mekaaninen vähentäminen", color: "#33a02c" }
];

let style = feature => {
  //console.log("vesty", feature.values_.toteutukse);
  let fill = new Fill({
    color: types.find(type => type.type === feature.get("tyyppi")).color
  });

  const { toteutukse } = feature.values_;

  const baseStyle = new Style({
    image: new Circle({
      radius: 9,
      fill: fill,
      stroke: new Stroke({
        color: "#000",
        width: 1.5
      })
    })
  });

  /*
   On joo. Mietin, että voisi olla "toteutuneet" mustalla paksulla reunaviivalla, "kesken" harmaalla paksulla reunalla ja "suunnitteilla" olevat siten kun nämä on nyt.
Ei välttämättä ole vielä suunnitteilla olevia mutta voi tulla
vesty Kesken
vesty Toteutunut
*/

  switch (toteutukse) {
    case "Kesken":
      //console.log("kesken");
      baseStyle.setImage(
        new Circle({
          radius: 9,
          fill: fill,
          stroke: new Stroke({
            color: "#808080",
            width: 6
          })
        })
      );
      break;
    case "Toteutunut":
      //console.log("Toteutunut");
      baseStyle.setImage(
        new Circle({
          radius: 9,
          fill: fill,
          stroke: new Stroke({
            color: "#000000",
            width: 6
          })
        })
      );
      break;
  }

  return baseStyle;
};

const Vesty = new VectorLayer({
  source: source,
  name: "Kunnostustoimenpiteet",
  title: "Kunnostustoimenpiteet",
  group: "Toimenpiteet",
  visible: false,
  style: style,
  description: `Kartalla esitetyt vesistöjen kunnostuskohteet ovat esimerkkejä suunnitelluista ja toteutuneista kunnostuksista järvillä, joilla ja niiden valuma-alueilla. Kohteista löytyvät kuvaukset, kuten mitä on tehty, kuka on tehnyt ja rahoittanut sekä mikä on hankkeen toteutusvaihe.`
});

export default Vesty;
