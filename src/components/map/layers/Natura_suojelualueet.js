import TileWMS from "ol/source/TileWMS";
import Tile from "ol/layer/Tile";

const source = new TileWMS({
  url:
    "https://paikkatieto.ymparisto.fi/arcgis/services/SYKE/SYKE_SuojellutAlueet/MapServer/WMSServer?request=GetMap",
  params: {
    VERSION: "1.1.0",
    FORMAT: "image/png",
    TRANSPARENT: true,
    LAYERS: "Natura 2000 - SAC Manner-Suomi aluemaiset",
    TILED: true
  }
});

const NaturaSuojelualueet = new Tile({
  source: source,
  opacity: 0.75,
  title: "Natura 2000 - SAC Manner-Suomi aluemaiset",
  name: "Natura 2000 - SAC Manner-Suomi aluemaiset",
  visible: false,
  description: `
  Natura 2000 - SAC Manner-Suomi. Erityisten suojelutoimien alue.`
});

export default NaturaSuojelualueet;
