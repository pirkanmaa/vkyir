import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import BasemapControl from './BasemapControl';
import LayerControl from './LayerControl';
import Divider from 'material-ui/Divider';

const styles = {
  paper: {
    width: '250px'
  },
  root: {
    marginTop: '1rem',
    marginBottom: '1rem'
  }
}

class LayerDrawer extends Component {
  render() {

    const { classes } = this.props;

    return (
      <div>
        <Drawer
          classes={{ paper: classes.paper }}
          variant='persistent'
          anchor='left'
          open={this.props.layerDrawerVisibility}>
          <LayerControl
            maplayers={this.props.maplayers}
            toggleLayer={this.props.toggleLayer}
          />
          <Divider
            classes={{ root: classes.root }}
          />
          <BasemapControl
            changeBasemap={this.props.changeBasemap}
            basemap={this.props.basemap}
          />
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(LayerDrawer)
