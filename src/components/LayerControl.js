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
          <MenuItem> Layer Control </MenuItem>
        </Drawer>
      </div>
    );
  }
}
