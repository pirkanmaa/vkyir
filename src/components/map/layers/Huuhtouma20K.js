import TileWMS from "ol/source/TileWMS";
import Tile from "ol/layer/Tile";

// http://aineistot.metsakeskus.fi/metsakeskus/services/Vesiensuojelu/Vesiuomien_maa_aineksen_huuhtoutumisriski/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=1
const source = new TileWMS({
  url:
    "https://aineistot.metsakeskus.fi/metsakeskus/services/Vesiensuojelu/Vesiuomien_maa_aineksen_huuhtoutumisriski/MapServer/WMSServer?",
  params: {
    VERSION: "1.3.0",
    FORMAT: "image/png",
    TRANSPARENT: true,
    LAYERS: "1",
    TILED: true
  }
});

const Huuhtouma_20K_maapera = new Tile({
  source: source,
  opacity: 0.75,
  title: "Maaperä 1:20 000",
  name: "Maaperä 1:20 000",
  group: "Muu",
  visible: false,
  description: `Maaperä 1:20 000/1:50 000 aineisto sisältää vuosina 1972-2007 maankäytön suunnitteluun, maankamaran raaka-aineiden tutkimukseen ja inventointiin, ympäristönhoitoon ja tieteelliseen tutkimukseen tuotettua tietoa. <br>Kartoitusmittakaava on pääsääntöisesti ollut 1:10 000. Aineistossa on esitetty pohjamaana 1 metrin syvyydessä oleva maalaji. Pohjamaakuvion minimikoko on yleensä 2 hehtaaria; poikkeuksena saaret, suo- ja peltosaarekkeet sekä geologisesti merkittävät kohteet. Pohjamaan päällä oleva 0,4-0,9 metrin paksuinen maakerros on kuvattu pintamaana. Geologisesti tai taloudellisesti merkittävissä tapauksissa voidaan kuvata paksumpikin pintamaakerros. Pintamaan minimikuviokoko on yleensä 4 hehtaaria. Alle 0,4 metrin paksuisia tai vaikeasti rajattavia peittäviä maakerroksia kuvataan pistemäisinä tietoina, joiden vaikutusalueen koko on vähintään 4 hehtaaria. <br>Maalajien lisäksi aineistossa kuvataan eri tavoin syntyneitä geologisia maaperämuodostumia, kuten harjuja ja kumpumoreeneja. Muita kartoituskohteita, esimerkiksi pienet kalliohavainnot, dyynit, muinaisrannat, on esitetty pistemäisinä tai viivamaisina tietoina.`
});

export default Huuhtouma_20K_maapera;
