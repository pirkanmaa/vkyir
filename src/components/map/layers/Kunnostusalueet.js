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
    LAYERS: "pirely:Vesienhoito_kunnostuskohteet",
    TILED: false,
    CRS: "EPSG:3067",
    STYLES: ""
  }
});

const Kunnostusalueet = new Tile({
  source: source,
  opacity: 1,
  title: "Järvi- ja jokikunnostusalueet",
  name: "Järvi- ja jokikunnostusalueet",
  visible: false,
  description: `Pirkanmaan vesienhoidon toimenpideohjelmassa (TPO) on valittu vesirakentamisen, säännöstelyn ja kunnostusten järvi- ja jokikunnostuskohteita. Valinnassa ovat ensisijaisina vesimuodostumat, jotka eivät vielä ole saavuttaneet ympäristötavoitetta hyvästä tilasta tai joiden tilan on vaarassa heikentyä. 
    Valitut kohteet liittyvät rehevöityneiden järvien kunnostuksiin, säännöstelyn kehittämiseen (Kyrösjärvi) sekä virtavesien elinympäristökunnostuksiin.<br>
    
    Vesienhoidon tavoitteena koko EU:ssa on saavuttaa pinta- ja pohjavesien vähintään hyvä tila. Samalla vesien tila ei saa myöskään heiketä.<br>
    Vesienhoitoa suunnitellaan Manner-Suomen seitsemällä vesienhoitoalueella. Pirkanmaa kuuluu kokonaisuudessaan Kokemäenjoen-Saaristomeren-Selkämeren vesienhoitoalueeseen (VHA 3). Lisäksi vesienhoitoalueeseen kuuluu vesiä myös Satakunnasta, Varsinais-Suomesta, Hämeestä, Pirkanmaalta, Keski-Suomesta, Etelä-Pohjanmaalta, Pohjanmaalta ja Keski-Pohjanmaalta.
    Vesienhoitosuunnitelmissa ja toimenpideohjelmissa esitetään tietoa vesien tilasta ja niihin vaikuttavista tekijöistä sekä tarvittavista toimista, joilla vesien hyvä tila aiotaan saavuttaa ja ylläpitää. Toimenpideohjelmat on valmistettu yhteistyössä alueen vesienhoidon yhteistyöryhmän kanssa.
    <br>Pirkanmaan vesienhoidon toimenpideohjelma on luettavissa alla olevasta linkistä. `
});

export default Kunnostusalueet;
