import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';

export default class ZoomOut extends Component {
  render() {
    return (
      <FloatingActionButton mini={true} onClick={() => this.props.handleClick()}>
        <ContentRemove />
      </FloatingActionButton>
    );
  }
}