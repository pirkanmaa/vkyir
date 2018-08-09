import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';

import Layers from './layers/Layers';
import Slider from '@material-ui/lab/Slider';

const styles = theme => ({
  root: {
    display: 'flex',
    paddingLeft: '1rem',
    paddingTop: '1rem',
  },
  superContainer: {
    width: '250px'
  },
  button: {
    position: 'absolute',
    right: '8px'
  },
  addButton: {
    paddingLeft: '14px'
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  sliderRoot: {
    maxWidth: '150px',
    paddingLeft: 0
  }
})

class LayerControl extends Component {

  state = {
    show: { "visibility": Layers.map(item => item.visibility), "title": Layers.map(item => item.title) },
    showLayerAdder: false,
    layerOpacity: Layers.map(item => item.layer.values_.opacity)
  }

  toggleLayerAdder = () => this.setState({ showLayerAdder: !this.state.showLayerAdder });
  closeLayerAdder = () => this.setState({ showLayerAdder: false });

  toggleVisibility = event => {
    this.props.toggleLayer(event)
    let index = this.state.show.title.findIndex(title => title === event.target.value);
    let show = Object.assign({}, this.state.show);
    show.visibility = show.visibility.map((item, i) => { return i === index ? !item : item });
    this.setState({ show });
  }

  changeLayerOpacity = (name,index) => (event, value) => {
    let opacities = this.state.layerOpacity
    opacities[index] = value;
    console.log(name);
    this.setState({ layerOpacity: opacities });
    let layers = this.props.map.getLayers().getArray();
    layers.find(layer => layer.getProperties().name === name).setOpacity(opacities[index]);

  };

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.superContainer}>
        <FormControl component="fieldset" required classes={{ root: classes.root }}>
          <FormGroup
            aria-label="layers"
            name="layers"
          >
            {Layers.map((item, index) => (
              this.state.show.title.indexOf(item.title) > -1 &&
              <div key={index}>
                <FormControlLabel
                  key={'A' + index}
                  label={item.title}
                  control={
                    <Checkbox
                      key={'B' + index}
                      checked={this.state.show.visibility[this.state.show.title.indexOf(item.title)]}
                      value={item.name}
                      onChange={this.toggleVisibility}
                    />
                  }
                />
                <Slider value={this.state.layerOpacity[index]} aria-labelledby="lyropacitycontrol" onChange={this.changeLayerOpacity(item.name,index)} min={0} max={1}
                  classes={{ root: classes.sliderRoot }} />
              </div>
            ))}

          </FormGroup>
        </FormControl>

      </div>

    );
  }
}

export default withStyles(styles)(LayerControl)