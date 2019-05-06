import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
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
    width: "18px",
    height: "18px"
  },
  {
    type: "Kesken (kehys toimenpiteen alla)",
    color: "#808080",
    width: "18px",
    height: "18px"
  },

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

class LayerInfo extends Component {
  showLegend = layer => {
    const { classes } = this.props;

    switch (layer) {
      case "Eroosiomalli, Metsä":
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
        break;
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
        break;
      case "Vesienhoidon tehostamisalueet":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <br />
            <span>
              <a
                href="https://www.ymparisto.fi/fi-FI/Vesi/Vesiensuojelu/Vesienhoidon_suunnittelu_ja_yhteistyo/Vesienhoito_ELYkeskuksissa/Pirkanmaa/Toimenpideohjelmat_ja_toimenpiteiden_toteutus"
                target="_blank"
                key="tpo1"
              >
                Toimenpideohjelma (TPO)
              </a>
            </span>
            <Typography variant="body2" className={classes.typography}>
              Vesienhoidon tehostamisalueet
            </Typography>
            <img src="https://tieto.pirkanmaa.fi/geoserver/pirely/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=24&height=24&layer=TPO&legend_options=fontName:Arial;fontSize:14;fontAntiAliasing:true" />
          </div>
        );
        break;
      case "Järvi- ja jokikunnostusalueet":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <br />
            <span>
              <a
                href="https://www.ymparisto.fi/fi-FI/Vesi/Vesiensuojelu/Vesienhoidon_suunnittelu_ja_yhteistyo/Vesienhoito_ELYkeskuksissa/Pirkanmaa/Toimenpideohjelmat_ja_toimenpiteiden_toteutus"
                target="_blank"
                key="tpo2"
              >
                Toimenpideohjelma (TPO)
              </a>
            </span>
          </div>
        );
        break;
      case "Kipsi":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <br />
            <span>
              <a
                href="http://ely.maps.arcgis.com/apps/MapSeries/index.html?appid=a4304635a6de41afb7c736c51b1ae3cf"
                target="_blank"
                key="tpo2"
              >
                Lisätietoja aineistosta
              </a>
            </span>
            <br />
            <br />
            <span>
              <a
                href="https://www.ymparisto.fi/kotoma"
                target="_blank"
                key="tpo2"
              >
                Lisätietoja Kotoma
              </a>
            </span>
          </div>
        );
        break;
      case "Biohiili":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <br />
            <span>
              <a
                href="http://ely.maps.arcgis.com/apps/MapSeries/index.html?appid=a4304635a6de41afb7c736c51b1ae3cf"
                target="_blank"
                key="tpo2"
              >
                Lisätietoja aineistosta
              </a>
            </span>
            <br />
            <br />
            <span>
              <a
                href="https://www.ymparisto.fi/kotoma"
                target="_blank"
                key="tpo2"
              >
                Lisätietoja Kotoma
              </a>
            </span>
          </div>
        );
        break;
      case "Tulvariskivyöhykkeet (vesistö)":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <br />
            <span>
              <a
                href="https://www.ymparisto.fi/tulvakartat?f=Pirkanmaan_ELYkeskus"
                target="_blank"
                key="tpo2"
              >
                Lisätietoja aineistosta
              </a>
            </span>
          </div>
        );
        break;
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
                    width: `${types.width}`,
                    height: `${types.height}`
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
        break;
      case "Pohjavesialueet":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <br />
            <span>
              <a
                href="http://metatieto.ymparisto.fi:8080/geoportal/catalog/search/resource/details.page?uuid=%7BF8321822-0A0D-4AC4-81E3-B9E3BE6386A2%7D"
                target="_blank"
                key="tpo2"
              >
                Lisätietoja aineistosta
              </a>
            </span>
          </div>
        );
        break;
      case "Valtion maiden luonnonsuojelualueet":
      case "Yksityiset suojelualueet":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <br />
            <span>
              <a
                href="http://metatieto.ymparisto.fi:8080/geoportal/catalog/search/resource/details.page?uuid=%7B2627E9FE-B657-48E1-A98D-000D4CD5CA38%7D"
                target="_blank"
                key="tpo2"
              >
                Lisätietoja aineistosta
              </a>
            </span>
          </div>
        );
        break;
      case "Natura 2000 - SAC Manner-Suomi aluemaiset":
        return (
          <div classes={{ root: classes.root }}>
            <br />
            <Divider />
            <br />
            <span>
              <a
                href="http://metatieto.ymparisto.fi:8080/geoportal/catalog/search/resource/details.page?uuid=%7B36FA93DC-F156-427E-973E-E83F7AFC6306%7D"
                target="_blank"
                key="tpo2"
              >
                Lisätietoja aineistosta
              </a>
            </span>
          </div>
        );
        break;
    }
  };

  render() {
    const classes = this.props;

    return (
      <div>
        <Dialog
          disableRestoreFocus={true}
          open={this.props.layerInfoVisibility}
          aria-labelledby="login-dialog-title"
          onClose={this.props.toggleLayerInfo}
        >
          <DialogTitle id="login-dialog-title">
            {this.props.infoLayer}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              paragraph={true}
              align="justify"
              style={{ color: "black", marginBottom: 0 }}
            >
              {this.props.layerInfo &&
                this.props.layerInfo.split("<br>").map((text, i) => {
                  return i == 0 ? (
                    text
                  ) : (
                    <span>
                      <br />
                      <br />
                      {text}
                    </span>
                  );
                })}
            </DialogContentText>
            {this.props.infoLayer && this.showLegend(this.props.infoLayer)}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.toggleLayerInfo} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(LayerInfo);
