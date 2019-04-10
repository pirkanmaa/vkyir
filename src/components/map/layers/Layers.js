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

/* Choose basemaps */
let Layers = [
  Rusle, // Eroosiot
  Rusle2,
  Biohiili, // Maatalouden vesistötoimenpiteet
  Lanta,
  Kalkki,
  PeltolohkotPV,
  Suojavyohyke,
  Reittivesistoon,
  Fosforit_pitoisuus, // Kuormitus
  Fosforit_pistekuorma,
  Forforit_metsakuorma,
  Forforit_peltokuorma,
  Pintavesieko, // EI RYHMÄÄ
  JokienKunto,
  Kuntarajat,
  TPO,
  Kunnostusalueet,
  Vesty,

  Tulvariski_1000,
  Pohjavesialueet,
  NaturaSuojelualueet,
  YksityisetSuojelualueet,
  ValtionSuojeluAlueet,
  Huuhtouma_20K_maapera,

  Maalajinrajanopeus,
  Salaojitus
];

/* This converts the above basemap array into an array of objects with keys "layer, name, title" with values from map layers */
function convert(array) {
  return array.reduce((acc, layer) => {
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

export default (Layers = convert(Layers));
