import Kuntarajat from "./Kuntarajat";
import Rusle from "./Rusle";
import Rusle2 from "./Rusle2";

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
import Biohiili from "./Biohiili";
import Lanta from "./Lanta";

import JokienKunto from "./jokien_kunto";
import Tulvariski_1000 from "./Tulvaalueet";
import Pohjavesialueet from "./Pohjavesialueet";
import NaturaSuojelualueet from "./Natura_suojelualueet";
import YksityisetSuojelualueet from "./YksityisetSuojeluAlueet";
import ValtionSuojeluAlueet from "./ValtionmaidenSuojeluAlueet";

import Huuhtouma_20K_maapera from "./Huuhtouma20K";

import Maalajinrajanopeus from "./HuuhtoumariskiRajanopeus";

import Salaojitus from "./Salaojitus";
import Kalkki from "./Kalkki";
import PeltolohkotPV from "./LohkotPohjavesi";
import Suojavyohyke from "./Suojavyohyke";
import Reittivesistoon from "./Peltolohkotvesistoon";

import Turpeenotto from "./Turpeennosto";

import SykeRantaviiva from "./SykeRantaviiva";
import Suot from "./Suot";

/* Choose basemaps */
let Layers = [
  Rusle, // Eroosiot
  Rusle2,
  Maalajinrajanopeus,
  /*Biohiili,*/

  Lanta, // Maatalouden vesiensuojelutoimenpiteet, KOTOMA
  Kalkki,
  PeltolohkotPV,
  Suojavyohyke,
  Reittivesistoon,
  Salaojitus,

  // SYKE dataa kuralla ota takaisin kun linjassa. 29052019
  // otettiin takaisin vaikka kuralla 18092019
  Fosforit_pitoisuus, // Kuormitus
  Fosforit_pistekuorma,
  Forforit_metsakuorma,
  Forforit_peltokuorma,

  Pintavesieko, // Vesien tila
  JokienKunto,

  Kunnostusalueet, // Toimenpiteet
  Vesty,
  TPO,

  Pohjavesialueet, //Suojelualueet
  NaturaSuojelualueet,
  YksityisetSuojelualueet,
  ValtionSuojeluAlueet,

  Kuntarajat, // Muu
  Tulvariski_1000,
  Huuhtouma_20K_maapera,
  Turpeenotto,
  SykeRantaviiva,
  Suot
];

/* This converts the above basemap array into an array of objects with keys "layer, name, title" with values from map layers */
function convert(array) {
  return array.reduce((acc, layer) => {
    //console.log(layer.getProperties().group);
    acc.push({
      layer: layer,
      name: layer.getProperties().name,
      title: layer.getProperties().title,
      visibility: layer.getProperties().visible,
      group: layer.getProperties().group
    });
    return acc;
  }, []);
}

export default Layers = convert(Layers);
