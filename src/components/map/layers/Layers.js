import Kuntarajat from "./Kuntarajat";
import Rusle from "./Rusle";
import Vesty from "./Vesty";
import Pintavesieko from "./Pintavesieko";
import Jokikunnostukset from "./Jokikunnostukset";
import Jarvikunnostukset from "./Jarvikunnostukset";
import Kunnostusalueet from "./Kunnostusalueet";
import TPO from "./TPO";

import Fosforit_pistekuorma from "./Fosfori_0";
import Fosforit_pitoisuus from "./Fosfori_1";
import Forforit_metsakuorma from "./Fosfori_2";
import Forforit_peltokuorma from "./Fosfori_3";
import Kipsi from "./Kipsi";

/* Choose basemaps */
let Layers = [
  Rusle,
  Pintavesieko,
  Kuntarajat,
  TPO,
  Kunnostusalueet,
  Vesty,
  Fosforit_pitoisuus,
  Fosforit_pistekuorma,
  Forforit_metsakuorma,
  Forforit_peltokuorma,
  Kipsi
];

/* This converts the above basemap array into an array of objects with keys "layer, name, title" with values from map layers */
function convert(array) {
  return array.reduce((acc, layer) => {
    acc.push({
      layer: layer,
      name: layer.getProperties().name,
      title: layer.getProperties().title,
      visibility: layer.getProperties().visible
    });
    return acc;
  }, []);
}

export default (Layers = convert(Layers));
