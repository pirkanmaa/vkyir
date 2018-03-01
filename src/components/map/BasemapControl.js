import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';

const styles = {
  root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      left: '1rem',
      top: '1rem',
      position: 'absolute',
      zIndex: 1500
  }
}

class BasemapControl extends Component {

  render() {

    const { classes } = this.props;

    return (
      <div>
        <FormControl component="fieldset" required classes={{root: classes.root}}>
          <FormLabel component="legend">Basemap</FormLabel>
          <RadioGroup
            aria-label="basemap"
            name="basemap"
            value={this.props.basemap}
            onChange={this.props.handleChange}
          >
            <FormControlLabel value="CartoLight" control={<Radio />} label="Carto Light" />
            <FormControlLabel value="MapboxLight" control={<Radio />} label="Mapbox Light" />
            <FormControlLabel value="MapboxDark" control={<Radio />} label="Mapbox Dark" />
            <FormControlLabel value="OSM" control={<Radio />} label="OpenStreetMap" />
            <FormControlLabel value="MapboxSatellite" control={<Radio />} label="Mapbox Satellite" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

BasemapControl.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasemapControl)