import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import BasemapControl from './map/BasemapControl';

const styles = {
  paper: {
    width: '250px'
  }
}

class LayerControl extends Component {
  render() {

    const { classes } = this.props;

    return (
      <div>
        <Drawer
          classes={{ paper: classes.paper }}
          variant='persistent'
          anchor='left'
          open={this.props.layerControlVisibility}>
          <BasemapControl
            handleChange={this.props.handleChange}
            basemap={this.props.basemap}
          />
        </Drawer>
      </div>
    );
  }
}

LayerControl.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LayerControl)