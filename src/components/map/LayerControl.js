import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import Layers from "./layers/Layers";
import Slider from "@material-ui/lab/Slider";
import LayerInfo from "./LayerInfo";

import LayerMeta from "./LayerMeta";

const styles = theme => ({
  root: {
    display: "flex",
    paddingLeft: "1rem",
    paddingTop: "1rem"
  },
  superContainer: {
    width: "250px"
  },
  button: {
    position: "absolute",
    right: "8px"
  },
  addButton: {
    paddingLeft: "14px"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  sliderRoot: {
    maxWidth: "150px",
    paddingLeft: 0
  },
  infoButton: {
    textTransform: "none",
    textAlign: "left"
  }
});

class LayerControl extends Component {
  state = {
    show: {
      visibility: Layers.map(item => item.visibility),
      title: Layers.map(item => item.title)
    },
    layerOpacity: Layers.map(item => item.layer.values_.opacity),
    layerInfoVisibility: false,
    infoLayer: "",
    layerInfo: null
  };

  toggleLayerAdder = () =>
    this.setState({ showLayerAdder: !this.state.showLayerAdder });
  closeLayerAdder = () => this.setState({ showLayerAdder: false });

  toggleVisibility = event => {
    this.props.toggleLayer(event);
    let index = this.state.show.title.findIndex(
      title => title === event.target.value
    );
    let show = Object.assign({}, this.state.show);
    show.visibility = show.visibility.map((item, i) => {
      return i === index ? !item : item;
    });
    this.setState({ show });
  };

  changeLayerOpacity = (name, index) => (event, value) => {
    let opacities = this.state.layerOpacity;
    opacities[index] = value;
    this.setState({ layerOpacity: opacities });
    let layers = this.props.map.getLayers().getArray();
    layers
      .find(layer => layer.getProperties().name === name)
      .setOpacity(opacities[index]);
  };

  setLayerInfo = item => {
    this.setState({ layerInfo: item.layer.values_.description || "" });
    this.setState({ infoLayer: item.name });
  };

  toggleLayerInfo = () => {
    this.setState({ layerInfoVisibility: !this.state.layerInfoVisibility });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.superContainer}>
        <FormControl
          component="fieldset"
          required
          classes={{ root: classes.root }}
        >
          <FormGroup aria-label="layers" name="layers">
            {Layers.map(
              (item, index) =>
                this.state.show.title.indexOf(item.title) > -1 && (
                  <div key={index}>
                    <FormControlLabel
                      key={"A" + index}
                      label={
                        <Tooltip
                          id="layerInfoTooltip"
                          title="lisätietoa"
                          placement="right-start"
                          leaveTouchDelay={250}
                          enterTouchDelay={500}
                        >
                          <Button
                            classes={{ root: classes.infoButton }}
                            variant="text"
                            disableFocusRipple={true}
                            disableRipple={true}
                            onClick={() => {
                              this.setLayerInfo(item);
                              this.toggleLayerInfo();
                            }}
                          >
                            {item.title}
                          </Button>
                        </Tooltip>
                      }
                      control={
                        <Checkbox
                          key={"B" + index}
                          checked={
                            this.state.show.visibility[
                              this.state.show.title.indexOf(item.title)
                            ]
                          }
                          value={item.name}
                          onChange={this.toggleVisibility}
                        />
                      }
                    />
                    <Slider
                      value={this.state.layerOpacity[index]}
                      aria-labelledby="lyropacitycontrol"
                      onChange={this.changeLayerOpacity(item.name, index)}
                      min={0}
                      max={1}
                      classes={{ root: classes.sliderRoot }}
                    />
                    <LayerMeta
                      layerName={item.name}
                      visibility={this.state.show.visibility[index]}
                    />
                  </div>
                )
            )}
          </FormGroup>
        </FormControl>
        <LayerInfo
          layerInfoVisibility={this.state.layerInfoVisibility}
          toggleLayerInfo={this.toggleLayerInfo}
          infoLayer={this.state.infoLayer}
          layerInfo={this.state.layerInfo}
        />
      </div>
    );
  }
}

export default withStyles(styles)(LayerControl);
