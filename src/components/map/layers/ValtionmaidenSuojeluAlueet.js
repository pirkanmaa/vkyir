import TileWMS from "ol/source/TileWMS";
import Tile from "ol/layer/Tile";

const source = new TileWMS({
  url:
    "https://paikkatieto.ymparisto.fi/arcgis/services/SYKE/SYKE_SuojellutAlueet/MapServer/WMSServer?request=GetMap",
  params: {
    VERSION: "1.1.0",
    FORMAT: "image/png",
    TRANSPARENT: true,
    LAYERS: "Valtion maiden luonnonsuojelualueet",
    TILED: true
  }
});

/*
https://paikkatieto.ymparisto.fi/arcgis/services/SYKE/SYKE_SuojellutAlueet/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=Valtion maiden luonnonsuojelualueet

*/

const ValtionSuojeluAlueet = new Tile({
  source: source,
  opacity: 0.75,
  title: "Valtion maiden luonnonsuojelualueet",
  name: "Valtion maiden luonnonsuojelualueet",
  visible: false,
  description: `Luonnonsuojelu- ja erämaa-alueet<br>
  Luonnonsuojelu- ja erämaa-alueet –aineisto koostuu luonnonsuojelulain nojalla tai asetuksella valtion maille tai lääninhallituksen päätöksellä yksityismaille perustetuista luonnonsuojelualueista. Aineistoon kuuluvat myös luonnontilaisina säilytettävät ja osittain luonnonmukaisesti käsiteltävät laaja-alaiset erämaa-alueet. 1.9.2014 alkaen aineisto on tuotettu kokonaisuudessaan Metsähallituksen SATJ-järjestelmässä. Aineisto kuuluu SYKEn avoimiin aineistoihin (CC BY 4.0).<br>
  Lisätietoja aineistosta: http://metatieto.ymparisto.fi:8080/geoportal/catalog/search/resource/details.page?uuid=%7B2627E9FE-B657-48E1-A98D-000D4CD5CA38%7D`
});

export default ValtionSuojeluAlueet;
