import React from "react";
import TileWMS from "ol/source/TileWMS";
import Tile from "ol/layer/Tile";

const source = new TileWMS({
  url:
    "https://paikkatieto.ymparisto.fi/arcgis/services/SYKE/SYKE_PintavesienEkologinenTila/MapServer/WMSServer?",
  params: {
    VERSION: "1.3.0",
    FORMAT: "image/png",
    TRANSPARENT: true,
    LAYERS: "2",
    TILED: true
  }
});

const Pintavesieko = new Tile({
  extent: [249165, 6821146, 326873, 6903282],
  source: source,
  opacity: 0.75,
  title: "Pintavesien ekologinen tila, järvet",
  name: "Pintavesien ekologinen tila, järvet",
  group: "Vesien tila",
  visible: false,
  description:
    "Ekologisessa luokittelussa käytetään viisiportaista asteikkoa (huono, välttävä, tyydyttävä, hyvä, erinomainen). Luokittelussa huomioidaan biologisista tekijöistä kalasto, pohjaeläimet, päällyslevät sekä järvissä lisäksi vesikasvillisuus ja kasviplankton ml. klorofyllipitoisuus. Biologinen aineisto koostuu jokien koskinäytteistä ja järvien ranta-, ulappa ja syvännenäytteistä. Lisäksi ekologisessa luokituksessa huomioidaan myös vesistöjen tilaan vaikuttavat ihmistoiminnasta johtuvat tekijät, kuten veden laatu, kuormitus sekä erilaiset vesirakentamisen aiheuttamat rakenteelliset muutokset, kuten padot ja perkaukset.<br>Suurin osa Pirkanmaan pintavesistä on ekologiselta tilaltaan hyviä tai erinomaisia. Järvet ovat paremmassa kunnossa kuin joet. Pirkanmaan järvien lukumäärästä 75 % ja pinta-alasta 79 % on erinomaisessa tai hyvässä ekologisessa tilassa. Jokien määrästä erinomaisessa tai hyvässä luokassa on 53 % ja jokipituudesta 40 %. Hyvää heikommassa tilassa on järvien määrästä 25 % ja pinta-alasta 21 % sekä jokien määrästä 47 % ja jokipituudesta 60 %. Arvio perustuu pääosin vuosien 2006-2012 seurantatietoihin. Pirkanmaalla on luokiteltu kaikkiaan 399 järveä ja jokea. Luokittelussa ovat mukana kaikki pinta-alaltaan yli 50 hehtaarin suuruiset järvet ja niiden laskujoet."
});

export default Pintavesieko;
