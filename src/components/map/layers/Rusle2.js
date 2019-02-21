import TileWMS from "ol/source/TileWMS";
import Tile from "ol/layer/Tile";

const source = new TileWMS({
  url:
    "https://georaster.tampere.fi/geoserver/georaster/wms?service=WMS&request=GetMap",
  params: {
    VERSION: "1.1.0",
    FORMAT: "image/png",
    TRANSPARENT: true,
    LAYERS: "georaster:rusle_eroosioaineistot",
    TILED: true
  }
});

const Rusle = new Tile({
  extent: [270000, 6815000, 330000, 6907500],
  source: source,
  opacity: 0.75,
  title: "Eroosiomalli, Pelto [t/ha/v]",
  name: "Eroosiomalli, Pelto [t/ha/v]",
  visible: false,
  description: `RUSLE 2015 (Revised Universal Soil Loss Equation) on JRC:n (Joint Research Center) kehittämä paikkatietopohjainen eroosiomalli, joka kuvaa sateen aiheuttamaa eroosiota (t/ha/v). Eroosioarvo lasketaan kertomalla yhteen sateen eroosiovaikutus (R), maaperän eroosiotekijä (K), maapeitteen aiheuttama vaimennus (C), rinteen pituus ja jyrkkyys (LS) sekä toimenpiteet eroosioaineksen liikkumisen estämiseksi tai ohjaamiseksi (P).<br>
  Luonnonvarakeskuksen vuonna muodostama eroosiomalli on tehty käyttäen Eurooppalaisen aineiston (sateen eroosiovaikutus) lisäksi parhaita saatavilla olevia kotimaisia aineistoja (Maanmittauslaitoksen laserkeilausaineistopohjainen 2 m  korkeusmalli, Maaseutuviraston kasvulohkotietoja ja Suomen maannostietokantaa).<br>
  Aineiston resoluutio on 2 m ja koordinaattijärjestelmä on ETRS-TM35FIN.
  `
});

export default Rusle;
