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
  { type: "Elinympäristökunnostus", color: "#8dd3c7" },
  { type: "Hapettaminen", color: "#ffffb3" },
  { type: "Hoitokalastus", color: "#bebada" },
  { type: "Järven nosto", color: "#fb8072" },
  { type: "Kalataloudellinen kunnostus", color: "#80b1d3" },
  {
    type: "Kalataloudellinen kunnostus, valuma-aluekunnostus",
    color: "#fdb462"
  },
  { type: "Kalatie", color: "#b3de69" },
  { type: "Kalkitus", color: "#d19581" },
  { type: "Kosteikko", color: "#fccde5" },
  { type: "Lintuvesikunnostus", color: "#d9d9d9" },
  //{ "type": 'Virtaaman säätö', "color": '#bc80bd' },
  { type: "Ruoppaus", color: "#ccebc5" },
  { type: "Tierumpu", color: "#ffed6f" },
  { type: "Valuma-aluekunnostus", color: "#1f78b4" },
  { type: "Vesialueen täyttö, rantaviivan muotoilu", color: "#b2df8a" },
  { type: "Vesikasvillisuuden mekaaninen vähentäminen", color: "#33a02c" }
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
  0,01 - 20 -> rgb(191,233,255)
  20,01 - 30 -> rgb(129,186,227)
  30,01 - 50 -> rgb(77,141,201)
  50,01 - 100 -> rgb(33,96,173)
  100,01 - 310 -> rgb(0,57,148) */

const legend_vemana_pitoisuus = [
  { type: "0,01 - 20", color: "#bfe9ff" },
  { type: "20,01 - 30", color: "#81bae3" },
  { type: "30,01 - 50", color: "#4d8dc9" },
  { type: "50,01 - 100", color: "#2160ad" },
  { type: "100,01 - 310", color: "#003994" }
];

/*
  0,01 - 1,5 -> rgba( 211, 255, 191, 1.00 ) #d3ffbf
  1,51 - 3 -> rgba( 156, 219, 125, 1.00 )   #9cdb7d
  3 - 4,5 -> rgba( 108, 184, 70, 1.00 )     #6cb846
  4,5 - 6 -> rgba( 68, 148, 28, 1.00 )      #44941c
  6 - 17,8 -> rgba( 38, 115, 0, 1.00 )      #267300 */

/* new
  0,01 - 1,5 -> rgba( 109,  153,  89, 1.00 )  #6d9959
  1,51 - 3 -> rgba( 84,  128,  64, 1.00 )     #548040
  3 - 4,5 -> rgba( 58,  102,  38, 1.00 )      #3a6626
  4,5 - 6 -> rgba( 33,  77,  13, 1.00 )       #214d0d
  6 - 17,8 -> rgba( 7,  51,  0, 1.00 )        #073300
  */

const legend_vemana_metsakuorma = [
  { type: "0,01 - 1,5", color: "#6d9959" },
  { type: "1,51 - 3", color: "#548040" },
  { type: "3 - 4,5", color: "#3a6626" },
  { type: "4,5 - 6", color: "#214d0d" },
  { type: "6 - 17,8", color: "#073300" }
];

/* 
  0,01 - 10 -> rgba( 230,217,13, 1.00 ) #e6d90d
  10,01 - 20 -> rgba( 214,194,20, 1.00 ) #d6c214
  20,01 - 40 -> rgba( 199,171,28, 1.00 ) #c7ab1c
  40,01 - 60 -> rgba( 184,148,36, 1.00 ) #b89424
  60,01 - 80-> rgba( 168,125,43, 1.00 ) #a87d2b
  80,01 - 117,07-> rgba( 153,102,51, 1.00 ) #996633
  PeltoPKg_Km2
  */
const legend_vemana_peltokuorma = [
  { type: "0,01 - 10", color: "#e6d90d" },
  { type: "10,01 - 20", color: "#d6c214" },
  { type: "20,01 - 40", color: "#c7ab1c" },
  { type: "40,01 - 60", color: "#b89424" },
  { type: "60,01 - 80", color: "#a87d2b" },
  { type: "80,01 - 117,07", color: "#996633" }
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
  { type: "Biohiilen ei ole sallittua", color: "#FF0000" },
  { type: "Biohiilen on sallittua", color: "#dcdc00" },
  { type: "Biohiilen on suositeltavaa", color: "#00c600" }
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
      case "Pintavesien ekologinen tila":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <Typography variant="body2" className={classes.typography}>
              Pintavesien ekologinen tila
            </Typography>
            <img src="http://paikkatieto.ymparisto.fi/arcgis/services/SYKE/SYKE_PintavesienEkologinenTila/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=1" />
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
          </div>
        );
      case "Pitoisuus P [ug/l]":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Fosfori pitoisuudet
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
      case "Pistekuorma [Kg/v] 12/2018":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Fosfori pistekuorma
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
      case "Metsakuorma [Kg/Km2/v] 12/2018":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Fosfori pitoisuudet
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
      case "Peltokuorma [Kg/Km2/v] 12/2018":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Fosfori pitoisuudet
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
      case "Biohiili":
        return (
          <div classes={{ root: classes.root }}>
            <Divider />
            <Typography className={classes.typography} variant="body2">
              Biohiili
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
