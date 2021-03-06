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
    LAYERS: "3",
    TILED: true
  }
});

const Huuhtouma50K = new Tile({
  source: source,
  opacity: 0.75,
  title: "Huuhtouma (Maaperä 1:50 000)",
  name: "Huuhtouma (Maaperä 1:50 000)",
  visible: false,
  description: `Riskianalyysi, joka on laskettu GTK:n maaperäaineiston, eri maalajien rajanopeusarvojen sekä aikaisemmin Suomen metsäkeskuksessa tehdyn veden virtausmallin perusteella. Veden virtausmalliaineistosta on tässä analyysissä käytetty veden virtausnopeutta. Tuloksena on tieto kohteista, joissa ojan virtausnopeus ylittää maalajin rajanopeuden. Maalajin rajanopeudella tarkoitetaan suurinta veden virtausnopeutta, jolloin maalajite ei vielä lähde liikkeelle eli ei synny eroosiota.`
});

export default Huuhtouma50K;
