import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import BasemapControl from './BasemapControl';

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

export default withStyles(styles)(LayerControl)