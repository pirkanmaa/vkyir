import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

const style = {
  margin: 10,
  display: 'flex'
}

const ZoomButtons = () => (
  <div>
    <FloatingActionButton mini={true} style={style}>
      <ContentAdd />
    </FloatingActionButton>
    <FloatingActionButton mini={true} style={style}>
      <ContentRemove />
    </FloatingActionButton>
  </div>
);

export default ZoomButtons;