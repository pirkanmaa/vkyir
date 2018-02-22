import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

export default class LayerControl extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Drawer open={this.props.drawerStatus}>
          <MenuItem> Map Layers </MenuItem>
          <MenuItem> Basemaps </MenuItem>
        </Drawer>
      </div>
    );
  }
}