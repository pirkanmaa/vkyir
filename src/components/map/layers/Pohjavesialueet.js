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
  description: `Aineisto sisältää vedenhankintaa varten kartoitetut ja luokitellut pohjavesialueet.
  Aineisto kuuluu SYKEn avoimiin aineistoihin (CC BY 4.0) lukuunottamatta pistemäisiä pohjavesialueita.<br> 
  Lisätietoja aineistosta: http://metatieto.ymparisto.fi:8080/geoportal/catalog/search/resource/details.page?uuid=%7BF8321822-0A0D-4AC4-81E3-B9E3BE6386A2%7D`
});

export default Pohjavesialueet;
