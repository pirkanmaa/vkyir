import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Basemaps from './basemaps/Basemaps';

import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '1rem',
  },
  sliderRoot: {
    maxWidth: '150px',
    paddingLeft: 0
  }
}

class BasemapControl extends Component {

  render() {

    const { classes } = this.props;

    return (
      <div>
        <FormControl component="fieldset" required classes={{ root: classes.root }}>
          {/*<FormLabel component="legend">Basemap</FormLabel>*/}
          <RadioGroup
            aria-label="basemap"
            name="basemap"
            value={this.props.basemap}
            onChange={this.props.changeBasemap}>

            {Basemaps.map((item, index) => (
              <FormControlLabel key={index} value={item.name} control={<Radio />} label={item.title} />
            ))}
          </RadioGroup>
          <Slider value={this.props.basemapOpacity} aria-labelledby="bmopacitycontrol" onChange={this.props.changeBasemapOpacity} min={0} max={1}
            classes={{root: classes.sliderRoot}}/>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(BasemapControl)