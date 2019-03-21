import TileWMS from "ol/source/TileWMS";
import Tile from "ol/layer/Tile";

const source = new TileWMS({
  url:
    "https://paikkatieto.ymparisto.fi/arcgis/services/INSPIRE/SYKE_Geologia/MapServer/WMSServer?request=GetMap",
  params: {
    VERSION: "1.1.0",
    FORMAT: "image/png",
    TRANSPARENT: true,
    LAYERS: "Pohjavesialuerajat",
    TILED: true
  }
});

const Pohjavesialueet = new Tile({
  source: source,
  opacity: 0.75,
  title: "Pohjavesialueet",
  name: "Pohjavesialueet",
  visible: false,
  description: `Pohjavesialueet`
});

export default Pohjavesialueet;
