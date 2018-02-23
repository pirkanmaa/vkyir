import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class LayerControl extends Component {

  render() {
    return (
      <div>
        <Drawer open={this.props.layerControlVisibility}>
          <MenuItem> Map Layers </MenuItem>
          <MenuItem> Basemaps </MenuItem>
        </Drawer>
      </div>
    );
  }
}