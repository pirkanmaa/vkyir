import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import { MenuItem } from 'material-ui/Menu';

export default class LayerControl extends Component {

  render() {
    return (
      <div>
        <Drawer
          variant='persistent'
          anchor='left'
          open={this.props.layerControlVisibility}>

          <MenuItem> Map layers </MenuItem>
          <MenuItem> Basemaps </MenuItem>

        </Drawer>
      </div>
    );
  }
}