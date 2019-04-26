import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { all as loadingstrategy } from "ol/loadingstrategy";

import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";

const url =
    "https://tieto.pirkanmaa.fi/geoserver/pirely/ows?service=WFS&version=1.0.0&request=GetFeature",
  layer = "pirely:jokikunnostukset_Ikaalistenreitti",
  proj = "EPSG:3067",
  format = "application/json";

const source = new VectorSource({
  format: new GeoJSON(),
  url: `${url}&typename=${layer}&srsname=${proj}&outputFormat=${format}`,
  strategy: loadingstrategy
});

let style = feature => {
  //console.log("jokikunnostukset", feature.values_);
  return new Style({
    stroke: new Stroke({
      color: "rgba(69, 150, 216, 1)",
      width: 1.5
    })
  });
};

const Jokikunnostukset = new VectorLayer({
  source: source,
  name: "Jokikunnostukset",
  title: "Jokikunnostukset",
  visible: false,
  style: style,
  description: `Kartalla esitetyt vesistöjen kunnostuskohteet ovat esimerkkejä suunnitelluista ja toteutuneista kunnostuksista järvillä, joilla ja niiden valuma-alueilla. Kohteista löytyvät kuvaukset, kuten mitä on tehty, kuka on tehnyt ja rahoittanut sekä mikä on hankkeen toteutusvaihe.`
});

export default Jokikunnostukset;
