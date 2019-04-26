import TileWMS from "ol/source/TileWMS";
import ImageWMS from "ol/source/ImageWMS";
import Tile from "ol/layer/Tile";

const source = new TileWMS({
  url:
    "https://tieto.pirkanmaa.fi/geoserver/pirely/wms?service=WMS&request=GetMap",
  params: {
    VERSION: "1.3.0",
    FORMAT: "image/png",
    TRANSPARENT: true,
    LAYERS: "pirely:TPO",
    TILED: false,
    CRS: "EPSG:3067",
    STYLES: ""
  }
});

const TPO = new Tile({
  extent: [249165, 6821146, 326873, 6903282],
  source: source,
  opacity: 0.75,
  title: "Vesienhoidon tehostamisalueet",
  name: "Vesienhoidon tehostamisalueet",
  group: "Toimenpiteet",
  visible: false,
  description: `Pirkanmaan vesienhoidon toimenpideohjelmassa (TPO) kuvatuilla tehostamisalueilla vesistöjen vedenlaatu edellyttää tehostettujen vesiensuojelumenetelmien käyttöä. Tehostamisalueet ovat sektorikohtaiset: maatalous sekä metsätalous ja turvetuotanto. Tehostamisalueiden määrityksessä on huomioitu mm. vesien tila, maankäyttömuotojen ja vesistökohtaisen kuormituksen vähennystarve. 
    <br>
    Vesienhoidon tavoitteena koko EU:ssa on saavuttaa pinta- ja pohjavesien vähintään hyvä tila. Samalla vesien tila ei saa myöskään heiketä.<br>
    Vesienhoitoa suunnitellaan Manner-Suomen seitsemällä vesienhoitoalueella. Pirkanmaa kuuluu kokonaisuudessaan Kokemäenjoen-Saaristomeren-Selkämeren vesienhoitoalueeseen (VHA 3). Lisäksi vesienhoitoalueeseen kuuluu vesiä myös Satakunnasta, Varsinais-Suomesta, Hämeestä, Pirkanmaalta, Keski-Suomesta, Etelä-Pohjanmaalta, Pohjanmaalta ja Keski-Pohjanmaalta.
    Vesienhoitosuunnitelmissa ja toimenpideohjelmissa esitetään tietoa vesien tilasta ja niihin vaikuttavista tekijöistä sekä tarvittavista toimista, joilla vesien hyvä tila aiotaan saavuttaa ja ylläpitää. Toimenpideohjelmat on valmistettu yhteistyössä alueen vesienhoidon yhteistyöryhmän kanssa. 
    <br>Pirkanmaan vesienhoidon toimenpideohjelma (TPO) on luettavissa alta olevasta linkistä. `
});

export default TPO;
