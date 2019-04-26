import TileWMS from "ol/source/TileWMS";
import Tile from "ol/layer/Tile";

const source = new TileWMS({
  url:
    "https://paikkatieto.ymparisto.fi/arcgis/services/INSPIRE/SYKE_Luonnonriskialueet/MapServer/WMSServer?request=GetMap",
  params: {
    VERSION: "1.1.0",
    FORMAT: "image/png",
    TRANSPARENT: true,
    LAYERS: "Tulvavaaravyohykkeet_Vesistotulva_1_1000a",
    TILED: true
  }
});

const Tulvariski_1000 = new Tile({
  source: source,
  opacity: 0.75,
  title: "Tulvariskivyöhykkeet (vesistö)",
  name: "Tulvariskivyöhykkeet (vesistö)",
  group: "Muu",
  visible: false,
  description: `Tulvariskivyöhykkeet (vesistö)`
});

export default Tulvariski_1000;
