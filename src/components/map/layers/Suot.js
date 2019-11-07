import TileWMS from "ol/source/TileWMS";
import Tile from "ol/layer/Tile";

// http://paikkatieto.ymparisto.fi/arcgis/rest/services/Projektit/VaikutaVesiin/MapServer/3
//"https://aineistot.metsakeskus.fi/metsakeskus/services/Vesiensuojelu/Vesiuomien_maa_aineksen_huuhtoutumisriski/MapServer/WMSServer?",
const source = new TileWMS({
  url:
    "https://paikkatieto.ymparisto.fi/arcgis/services/Projektit/VaikutaVesiin/MapServer/WMSServer?",
  params: {
    VERSION: "1.3.0",
    FORMAT: "image/png",
    TRANSPARENT: true,
    LAYERS: "1",
    TILED: true
  }
});

const Suot = new Tile({
  source: source,
  opacity: 0.75,
  title: "Suot",
  name: "Suot",
  group: "Muu",
  visible: false,
  description: `Soiden ohitustilanne`
});

export default Suot;
