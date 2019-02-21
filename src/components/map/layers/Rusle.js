import TileWMS from "ol/source/TileWMS";
import Tile from "ol/layer/Tile";

const source = new TileWMS({
  url:
    "https://aineistot.metsakeskus.fi/metsakeskus/services/Vesiensuojelu/RUSLE_2015_koko_Suomi_ja_kosteusindeksi_Puruvesi/MapServer/WMSServer?",
  params: {
    VERSION: "1.3.0",
    FORMAT: "image/png",
    TRANSPARENT: true,
    LAYERS: "10",
    TILED: true
  }
});

const Rusle = new Tile({
  extent: [270000, 6815000, 330000, 6907500],
  source: source,
  opacity: 0.75,
  title: "Eroosiomalli, Metsä [kg/ha/v]",
  name: "Eroosiomalli, Metsä [kg/ha/v]",
  visible: false,
  description: `Karttapohjainen valtakunnallinen eroosioriskimalli (kiintoainetta Kg/ha/vuosi), joka kuvaa metsän uudistamisen yhteydessä tehtävän maanmuokkauksen vaikutus eroosioon. Mallin avulla voidaan löytää eroosioriskin hot spot – lohkot koko valtakunnan tasolla metsien osalta. Mallia voidaan käyttää apuna suunniteltaessa vesistöjen kunnostustoimenpiteitä ja niiden sijoittamista. Eroosion mukana kulkeutuu eteläisen Suomen oloissa pääosa vesistöihin päätyvästä fosforikuormasta. Mallin on tuottanut Luonnonvarakeskus.`
});

export default Rusle;
