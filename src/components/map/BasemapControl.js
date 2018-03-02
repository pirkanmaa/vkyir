import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Basemaps from './basemaps/Basemaps';

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
        <FormControl component="fieldset" required classes={{ root: classes.root }}>
          <FormLabel component="legend">Basemap</FormLabel>
          <RadioGroup
            aria-label="basemap"
            name="basemap"
            value={this.props.basemap}
            onChange={this.props.handleChange}
          >

            {Basemaps.map((item, index) => (
              <FormControlLabel key={index} value={item.name} control={<Radio />} label={item.title} />
            ))}

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