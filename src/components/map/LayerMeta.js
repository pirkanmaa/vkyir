import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";

// Dialog with action buttons. The actions are passed in as an array of React objects.

const styles = {
  root: {
    paddingBottom: 10
  },
  avatar: {
    margin: 10,
    marginTop: 4,
    borderRadius: 50,
    width: "12.5px",
    height: "12.5px",
    marginLeft: 0
  },
  typography: {
    paddingBottom: 5,
    paddingTop: 10
  },
  slot: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "stretch",
    flexWrap: "nowrap",
    alignContent: "flex-start"
  }
};

const legend1 = [
  {
    type: "Toteutuneita (kehys toimenpiteen alla)",
    color: "#000000",
    width: 15,
    height: 15
  },
  {
    type: "Kesken (kehys toimenpiteen alla)",
    color: "#808080",
    width: 15,
    height: 15
  },

  {
    type: "Elinympäristökunnostus",
    color: "#8dd3c7",
    width: 10,
    height: 10
  },
  { type: "Hapettaminen", color: "#ffffb3", width: 10, height: 10 },
  { type: "Hoitokalastus", color: "#bebada", width: 10, height: 10 },
  { type: "Järven nosto", color: "#fb8072", width: 10, height: 10 },
  {
    type: "Kalataloudellinen kunnostus",
    color: "#80b1d3",
    width: 10,
    height: 10
  },
  {
    type: "Kalataloudellinen kunnostus, valuma-aluekunnostus",
    color: "#fdb462",
    width: 10,
    height: 10
  },
  { type: "Kalatie", color: "#b3de69", width: 10, height: 10 },
  { type: "Kalkitus", color: "#d19581", width: 10, height: 10 },
  { type: "Kosteikko", color: "#fccde5", width: 10, height: 10 },
  { type: "Lintuvesikunnostus", color: "#d9d9d9", width: 10, height: 10 },

  { type: "Ruoppaus", color: "#ccebc5", width: 10, height: 10 },
  { type: "Tierumpu", color: "#ffed6f", width: 10, height: 10 },
  { type: "Valuma-aluekunnostus", color: "#1f78b4", width: 10, height: 10 },
  {
    type: "Vesialueen täyttö, rantaviivan muotoilu",
    color: "#b2df8a",
    width: 10,
    height: 10
  },
  {
    type: "Vesikasvillisuuden mekaaninen vähentäminen",
    color: "#33a02c",
    width: 10,
    height: 10
  }
];

/*
  0,01 - 16 -> rgba( 76, 230, 0, 1.00 )
  16,01 - 70 -> rgba( 255, 255, 0, 1.00 )
  70,01 - 279 -> rgba( 255, 0, 0, 1.00 )
  */
const legend_vemana_pistekuorma = [
  { type: "0,01 - 16", color: "#4ce600" },
  { type: "16,01 - 70", color: "#ffff00" },
  { type: "70,01 - 279", color: "#ff0000" }
];

/*
Pitoisuus (Fosforipitoisuus (ug/l)
  0,01-20       #e6f9ff -> rgb(230,249,255)
  20,01-30      #0099cc -> rgb(0,153,204) 
  30,01 - 50    #bf80ff -> rgb(191,128,255) 
  50,01 - 100   #5900b3 -> rgb(89,0,179) 
  100,01 - 310  #993333 -> rgb(153,51,51) 

  0,01 - 20 -> rgb(191,233,255)
  20,01 - 30 -> rgb(129,186,227)
  30,01 - 50 -> rgb(77,141,201)
  50,01 - 100 -> rgb(33,96,173)
  100,01 - 310 -> rgb(0,57,148) */

const legend_vemana_pitoisuus = [
  { type: "0,01 - 20", color: "#e6f9ff" },
  { type: "20,01 - 30", color: "#0099cc" },
  { type: "30,01 - 50", color: "#bf80ff" },
  { type: "50,01 - 100", color: "#5900b3" },
  { type: "100,01 - 310", color: "#993333" }
];

/*
Metsäkuormitus Fosfori (Fosforikuormitus (kg/km2/v)
0,01-1,5 #e6f9ff -> rgb(230,249,255)
1,51-3 #0099cc   -> rgb(0,153,204) 
3-4,5 #bf80ff    -> rgb(191,128,255)
4,5-6 #5900b3    -> rgb(89,0,179) 
6-17,8 #993333   -> rgb(153,51,51) 
  */
const legend_vemana_metsakuorma = [
  { type: "0,01 - 1,5", color: "#e6f9ff" },
  { type: "1,51 - 3", color: "#0099cc" },
  { type: "3 - 4,5", color: "#bf80ff" },
  { type: "4,5 - 6", color: "#5900b3" },
  { type: "6 - 17,8", color: "#993333" }
];

/* 
Peltokuormitus Fosfori (Fosforikuormitus (kg/km2/v)
0,01-10 #e6f9ff  -> rgb(230,249,255)
10,01-20 #0099cc -> rgb(0,153,204) 
20,01-40 #bf80ff -> rgb(191,128,255)
40,01-60 #5900b3 -> rgb(89,0,179) 
60,01-80 #993333 -> rgb(153,51,51) 
80,01-177,07 #391313 -> rgb(57,19,19)
  */
const legend_vemana_peltokuorma = [
  { type: "0,01 - 10", color: "#e6f9ff" },
  { type: "10,01 - 20", color: "#0099cc" },
  { type: "20,01 - 40", color: "#bf80ff" },
  { type: "40,01 - 60", color: "#5900b3" },
  { type: "60,01 - 80", color: "#993333" },
  { type: "80,01 - 117,07", color: "#391313" }
];

/*
  "Kipsin levitys ei ole sallittua" -> rgba( 7255, 0, 0, 1.00 ) #FF0000
  "Kipsin levitys on sallittua" -> rgba( 220, 220, 0, 1.00 ) #dcdc00
  "Kipsin levitys on suositeltavaa" -> rgba( 0, 200, 0, 1.00 ) #008000
  */
const legend_vemana_kipsi = [
  { type: "Kipsin levitys ei ole sallittua", color: "#FF0000" },
  { type: "Kipsin levitys on sallittua", color: "#dcdc00" },
  { type: "Kipsin levitys on suositeltavaa", color: "#00c600" }
];

/*
  "Biohiilen ei ole sallittua" -> rgba( 7255, 0, 0, 1.00 ) #FF0000
  "Biohiilen on sallittua" -> rgba( 220, 220, 0, 1.00 ) #dcdc00
  "Biohiilen on suositeltavaa" -> rgba( 0, 200, 0, 1.00 ) #00c600
  */
const legend_vemana_biohiili = [
  { type: "Biohiilen käyttö ei ole sallittua", color: "#FF0000" },
  { type: "Biohiilen käyttö on sallittua", color: "#dcdc00" },
  { type: "Biohiilen käyttö on suositeltavaa", color: "#00c600" }
];

/* 
  Kuiva- ja lietelannan levitys on sallittua -> rgba( 0,102,0, 1.00 ) / #006600
  Lannan levitys ei ole sallittua -> rgba( 255,  0,  0, 1.00 ) / #FF0000
  Lietelannan levitys on sallittua -> rgba( 115,77,38, 1.00 ) / #734d26
  */
const legend_vemana_lanta = [
  { type: "Kuiva- ja lietelannan levitys on sallittua", color: "#006600" },
  { type: "Lannan levitys ei ole sallittua", color: "#FF0000" },
  { type: "Kuivalannan levitys on sallittua", color: "#734d26" }
];

/* legend_vemana_salaojitus
  Säätösalaojitus on mahdollista -> rgba( 0,102,0, 1.00 ) / #006600
  Säätösalaojitus ei ole mahdollista -> rgba( 255,  0,  0, 1.00 ) / #FF0000  
  */
const legend_vemana_salaojitus = [
  { type: "Säätösalaojitus on mahdollista", color: "#006600" },
  { type: "Säätösalaojitus ei ole mahdollista", color: "#FF0000" }
];

/* 
  Kalkin levitys on sallittua -> rgba( 0,102,0, 1.00 ) / #006600
  Kalkin levitys ei ole sallittua -> rgba( 255,  0,  0, 1.00 ) / #FF0000  
  */
const legend_vemana_kalkki = [
  { type: "Kalkin levitys on sallittua", color: "#006600" },
  { type: "Kalkin levitys ei ole sallittua", color: "#FF0000" }
];

/*
  "Erinomainen" -> rgba( 0, 0, 255, 1.00 ) #0000FF
  "Hyvä" -> rgba( 0, 255, 0, 1.00 ) #00FF00
  "Tyydyttävä" -> rgba( 255, 255, 0, 1.00 ) #FFFF00
  "Välttävä" -> rgba( 242, 148, 0, 1.00 ) #F29400
  "Huono" -> rgba( 237, 25, 36, 1.00 ) #ED1924
  "Ekologinen luokittelu puuttuu" -> rgba( 171, 167, 181, 1.00 ) #ABA7B5
  */
const legend_syke_joki = [
  { type: "Erinomainen", color: "#0000FF" },
  { type: "Hyvä", color: "#00FF00" },
  { type: "Tyydyttävä", color: "#FFFF00" },
  { type: "Välttävä", color: "#F29400" },
  { type: "Huono", color: "#ED1924" },
  { type: "Ekologinen luokittelu puuttuu", color: "#ABA7B5" }
];

/*              
  "järvet" -> rgba(125,157,255,0.8) #7d9dff  
  */
const legend_syke_jarvet = [{ type: "Järvet", color: "#7d9dff" }];

/* legend_plohkot_pv
  Palsta sijaitsee pohjaveden muodostumisalueella -> rgba( 0,0,204,0.22 ) / #0000cc
  Palsta sijaitsee pohjavesialueella -> rgba( 115, 178, 255, 1.00 ) / #73b2ff  
  */
const legend_plohkot_pv = [
  { type: "Palsta sijaitsee pohjaveden muodostumisalueella", color: "#0000cc" },
  { type: "Palsta sijaitsee pohjavesialueella", color: "#73b2ff" }
];

/* legend_vemana_suojavyohyke
  Suojavyöhykettä ei voida perustaa -> rgba( 255, 0, 0,0.22 ) / #ff0000
  Suojavyöhyke voidaan perustaa -> rgba( 230, 230, 0, 1.00 ) / #e6e600 
  Suojavyöhyke on suositeltava perustaa -> rgba( 112, 168, 0, 1.00 ) / ##70a800
  */
const legend_vemana_suojavyohyke = [
  { type: "Suojavyöhykettä ei voida perustaa", color: "#ff0000" },
  { type: "Suojavyöhyke voidaan perustaa", color: "#e6e600" },
  { type: "Suojavyöhyke on suositeltava perustaa", color: "#70a800" }
];

/* legend_vemana_vesistoon
  Palsta sijaitse alle 10 m etäisyydellä vesistöstä -> rgba( 255, 127, 127,0.22 ) / #ff7f7f
  Palsta sijaitse alle 5 m etäisyydellä vesistöstä -> rgba( 230, 0, 0, 1.00 ) / #e60000 
  */
const legend_vemana_vesistoon = [
  {
    type: "Palsta sijaitse alle 10 m etäisyydellä vesistöstä",
    color: "#ff7f7f"
  },
  { type: "Palsta sijaitse alle 5 m etäisyydellä vesistöstä", color: "#e60000" }
];

class LayerMeta extends Component {
  showMeta = layer => {
    const { classes } = this.props;

    /*
    console.log("curLayer", this.props.layerName);
    console.log("visible", this.props.visibility);*/

    switch (layer) {
      case "Eroosiomalli, Pelto [t/ha/v]":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <Typography variant="body2" className={classes.typography}>
              Eroosiomalli
            </Typography>
            <img src="https://georaster.tampere.fi/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=georaster:rusle_eroosioaineistot" />
          </div>
        );
      case "Eroosiomalli, Metsä [kg/ha/v]":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <Typography variant="body2" className={classes.typography}>
              Eroosiomalli
            </Typography>
            <img src="http://aineistot.metsakeskus.fi/metsakeskus/services/Vesiensuojelu/RUSLE_2015_koko_Suomi_ja_kosteusindeksi_Puruvesi/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=10" />
          </div>
        );
      case "Pintavesien ekologinen tila, järvet":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <Typography variant="body2" className={classes.typography}>
              Pintavesien ekologinen tila, järvet
            </Typography>
            <img src="https://paikkatieto.ymparisto.fi/arcgis/services/SYKE/SYKE_PintavesienEkologinenTila/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=1" />
          </div>
        );
      case "Vesienhoidon tehostamisalueet":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <Typography variant="body2" className={classes.typography}>
              Vesienhoidon tehostamisalueet
            </Typography>
            <img src="https://tieto.pirkanmaa.fi/geoserver/pirely/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=24&height=24&layer=TPO&legend_options=fontName:Arial;fontSize:14;fontAntiAliasing:true" />
          </div>
        );
      case "Kunnostustoimenpiteet":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Kunnostustoimenpiteet
            </Typography>
            {legend1.map((types, i) => (
              <div key={i} className={classes.slot}>
                <Avatar
                  classes={{ root: classes.avatar }}
                  style={{
                    background: `${types.color}`,
                    width: types.width,
                    height: types.height
                  }}
                />
                <Typography
                  variant="body1"
                  style={{ color: "black", fontSize: "14px", fontWeight: 400 }}
                >
                  {types.type}
                </Typography>
              </div>
            ))}
          </div>
        );
      case "Pitoisuus, Fosfori":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Fosforipitoisuus (ug/l)
            </Typography>
            {legend_vemana_pitoisuus.map((types, i) => (
              <div key={i} className={classes.slot}>
                <Avatar
                  classes={{ root: classes.avatar }}
                  style={{ background: `${types.color}` }}
                />
                <Typography
                  variant="body1"
                  style={{ color: "black", fontSize: "14px", fontWeight: 400 }}
                >
                  {types.type}
                </Typography>
              </div>
            ))}
            <br />
            <Divider />
          </div>
        );
      case "Pistekuormitus, Fosfori":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Fosforikuormitus (kg/v)
            </Typography>
            {legend_vemana_pistekuorma.map((types, i) => (
              <div key={i} className={classes.slot}>
                <Avatar
                  classes={{ root: classes.avatar }}
                  style={{ background: `${types.color}` }}
                />
                <Typography
                  variant="body1"
                  style={{ color: "black", fontSize: "14px", fontWeight: 400 }}
                >
                  {types.type}
                </Typography>
              </div>
            ))}
            <br />
            <Divider />
          </div>
        );
      case "Metsäkuormitus, Fosfori":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Fosforikuormitus (kg/km2/v)
            </Typography>
            {legend_vemana_metsakuorma.map((types, i) => (
              <div key={i} className={classes.slot}>
                <Avatar
                  classes={{ root: classes.avatar }}
                  style={{ background: `${types.color}` }}
                />
                <Typography
                  variant="body1"
                  style={{ color: "black", fontSize: "14px", fontWeight: 400 }}
                >
                  {types.type}
                </Typography>
              </div>
            ))}
            <br />
            <Divider />
          </div>
        );
      case "Peltokuormitus, Fosfori":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Fosforikuormitus (kg/km2/v)
            </Typography>
            {legend_vemana_peltokuorma.map((types, i) => (
              <div key={i} className={classes.slot}>
                <Avatar
                  classes={{ root: classes.avatar }}
                  style={{ background: `${types.color}` }}
                />
                <Typography
                  variant="body1"
                  style={{ color: "black", fontSize: "14px", fontWeight: 400 }}
                >
                  {types.type}
                </Typography>
              </div>
            ))}
            <br />
            <Divider />
          </div>
        );
      case "Kipsi":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Kipsi
            </Typography>
            {legend_vemana_kipsi.map((types, i) => (
              <div key={i} className={classes.slot}>
                <Avatar
                  classes={{ root: classes.avatar }}
                  style={{ background: `${types.color}` }}
                />
                <Typography
                  variant="body1"
                  style={{ color: "black", fontSize: "14px", fontWeight: 400 }}
                >
                  {types.type}
                </Typography>
              </div>
            ))}
            <br />
            <Divider />
          </div>
        );
      case "Biohiilen levitys":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Biohiilen levitys
            </Typography>
            {legend_vemana_biohiili.map((types, i) => (
              <div key={i} className={classes.slot}>
                <Avatar
                  classes={{ root: classes.avatar }}
                  style={{ background: `${types.color}` }}
                />
                <Typography
                  variant="body1"
                  style={{ color: "black", fontSize: "14px", fontWeight: 400 }}
                >
                  {types.type}
                </Typography>
              </div>
            ))}
            <br />
            <Divider />
          </div>
        );
      case "Lannan levitys":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Lannan levitys
            </Typography>
            {legend_vemana_lanta.map((types, i) => (
              <div key={i} className={classes.slot}>
                <Avatar
                  classes={{ root: classes.avatar }}
                  style={{ background: `${types.color}` }}
                />
                <Typography
                  variant="body1"
                  style={{ color: "black", fontSize: "14px", fontWeight: 400 }}
                >
                  {types.type}
                </Typography>
              </div>
            ))}
            <br />
            <Divider />
          </div>
        );
      case "Säätösalaojitus":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Säätösalaojitus
            </Typography>
            {legend_vemana_salaojitus.map((types, i) => (
              <div key={i} className={classes.slot}>
                <Avatar
                  classes={{ root: classes.avatar }}
                  style={{ background: `${types.color}` }}
                />
                <Typography
                  variant="body1"
                  style={{ color: "black", fontSize: "14px", fontWeight: 400 }}
                >
                  {types.type}
                </Typography>
              </div>
            ))}
            <br />
            <Divider />
          </div>
        );
      case "Peltolohkot vesistön läheisyydessä":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Peltolohkot vesistön läheisyydessä
            </Typography>
            {legend_vemana_vesistoon.map((types, i) => (
              <div key={i} className={classes.slot}>
                <Avatar
                  classes={{ root: classes.avatar }}
                  style={{ background: `${types.color}` }}
                />
                <Typography
                  variant="body1"
                  style={{ color: "black", fontSize: "14px", fontWeight: 400 }}
                >
                  {types.type}
                </Typography>
              </div>
            ))}
            <br />
            <Divider />
          </div>
        );

      case "Suojavyöhyke":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Suojavyohyke
            </Typography>
            {legend_vemana_suojavyohyke.map((types, i) => (
              <div key={i} className={classes.slot}>
                <Avatar
                  classes={{ root: classes.avatar }}
                  style={{ background: `${types.color}` }}
                />
                <Typography
                  variant="body1"
                  style={{ color: "black", fontSize: "14px", fontWeight: 400 }}
                >
                  {types.type}
                </Typography>
              </div>
            ))}
            <br />
            <Divider />
          </div>
        );

      case "Rakennekalkin levitys":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Rakennekalkin levitys
            </Typography>
            {legend_vemana_kalkki.map((types, i) => (
              <div key={i} className={classes.slot}>
                <Avatar
                  classes={{ root: classes.avatar }}
                  style={{ background: `${types.color}` }}
                />
                <Typography
                  variant="body1"
                  style={{ color: "black", fontSize: "14px", fontWeight: 400 }}
                >
                  {types.type}
                </Typography>
              </div>
            ))}
            <br />
            <Divider />
          </div>
        );

      case "Pintavesien ekologinen tila, joet":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Pintavesien ekologinen tila, joet
            </Typography>
            {legend_syke_joki.map((types, i) => (
              <div key={i} className={classes.slot}>
                <Avatar
                  classes={{ root: classes.avatar }}
                  style={{ background: `${types.color}` }}
                />
                <Typography
                  variant="body1"
                  style={{ color: "black", fontSize: "14px", fontWeight: 400 }}
                >
                  {types.type}
                </Typography>
              </div>
            ))}
            <br />
            <Divider />
          </div>
        );

      case "Järvet":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Järvet
            </Typography>
            {legend_syke_jarvet.map((types, i) => (
              <div key={i} className={classes.slot}>
                <Avatar
                  classes={{ root: classes.avatar }}
                  style={{ background: `${types.color}` }}
                />
                <Typography
                  variant="body1"
                  style={{ color: "black", fontSize: "14px", fontWeight: 400 }}
                >
                  {types.type}
                </Typography>
              </div>
            ))}
            <br />
            <Divider />
          </div>
        );

      case "Tulvariskivyöhykkeet (vesistö)":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <Typography variant="body2" className={classes.typography}>
              Tulvariskivyöhykkeet (vesistö)
            </Typography>
            <img src="http://paikkatieto.ymparisto.fi/arcgis/services/INSPIRE/SYKE_Luonnonriskialueet/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=Tulvavaaravyohykkeet_Vesistotulva_1_1000a&legend_options=fontName:Arial;fontSize:14;fontAntiAliasing:true" />
          </div>
        );
      case "Pohjavesialueet":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <Typography variant="body2" className={classes.typography}>
              Pohjavesialueet
            </Typography>
            <img src="https://paikkatieto.ymparisto.fi/arcgis/services/SYKE/SYKE_Pohjavesialueet/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=Pohjavesialuerajat&legend_options=fontName:Arial;fontSize:14;fontAntiAliasing:true" />
          </div>
        );
      case "Natura 2000 - SAC Manner-Suomi aluemaiset":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <Typography variant="body2" className={classes.typography}>
              Natura 2000 - SAC Manner-Suomi aluemaiset
            </Typography>
            <img src="https://paikkatieto.ymparisto.fi/arcgis/services/SYKE/SYKE_SuojellutAlueet/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=Natura 2000 - SAC Manner-Suomi aluemaiset&legend_options=fontName:Arial;fontSize:14;fontAntiAliasing:true" />
          </div>
        );
      case "Yksityiset suojelualueet":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <Typography variant="body2" className={classes.typography}>
              Yksityiset suojelualueet
            </Typography>
            <img src="https://paikkatieto.ymparisto.fi/arcgis/services/SYKE/SYKE_SuojellutAlueet/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=Yksityiset suojelualueet&legend_options=fontName:Arial;fontSize:14;fontAntiAliasing:true" />
          </div>
        );
      case "Valtion maiden luonnonsuojelualueet":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <Typography variant="body2" className={classes.typography}>
              Valtion maiden luonnonsuojelualueet
            </Typography>
            <img src="https://paikkatieto.ymparisto.fi/arcgis/services/SYKE/SYKE_SuojellutAlueet/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=Valtion maiden luonnonsuojelualueet&legend_options=fontName:Arial;fontSize:14;fontAntiAliasing:true" />
          </div>
        );
      case "Maaperä 1:20 000":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <Typography variant="body2" className={classes.typography}>
              Maaperä 1:20 000
            </Typography>
            <img src="https://aineistot.metsakeskus.fi/metsakeskus/services/Vesiensuojelu/Vesiuomien_maa_aineksen_huuhtoutumisriski/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=1&legend_options=fontName:Arial;fontSize:14;fontAntiAliasing:true" />
          </div>
        );
      case "Uomaeroosio":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <Typography variant="body2" className={classes.typography}>
              Uomaeroosio
            </Typography>
            <img src="https://aineistot.metsakeskus.fi/metsakeskus/services/Vesiensuojelu/Vesiuomien_maa_aineksen_huuhtoutumisriski/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=2&legend_options=fontName:Arial;fontSize:14;fontAntiAliasing:true" />
          </div>
        );
      case "Peltolohkot pohjavesialueella":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Peltolohkot pohjavesialueella
            </Typography>
            {legend_plohkot_pv.map((types, i) => (
              <div key={i} className={classes.slot}>
                <Avatar
                  classes={{ root: classes.avatar }}
                  style={{ background: `${types.color}` }}
                />
                <Typography
                  variant="body1"
                  style={{ color: "black", fontSize: "14px", fontWeight: 400 }}
                >
                  {types.type}
                </Typography>
              </div>
            ))}
            <br />
            <Divider />
          </div>
        );
    } // end switch
  };

  render() {
    if (this.props.visibility) {
      return <div>{this.showMeta(this.props.layerName)}</div>;
    } else {
      return null;
    }
  }
}

export default withStyles(styles)(LayerMeta);
