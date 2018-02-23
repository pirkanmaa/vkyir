import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
  marginBottom: 10
}

export default class ZoomIn extends Component {
  render() {
    return (
      <FloatingActionButton mini={true} style={style} onClick={() => this.props.handleClick()}>
        <ContentAdd />
      </FloatingActionButton>
    );
  }
}