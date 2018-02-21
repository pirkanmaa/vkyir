import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

export default class LayerControl extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <FlatButton
          label="Show map layers"
          onClick={this.handleToggle}
        />
        <Drawer open={this.state.open}>
          <MenuItem>Layer Control</MenuItem>
        </Drawer>
      </div>
    );
  }
}