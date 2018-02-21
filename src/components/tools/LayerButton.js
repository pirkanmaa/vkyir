import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MapsLayers from 'material-ui/svg-icons/maps/layers';
import MapsLayersClear from 'material-ui/svg-icons/maps/layers-clear';

const style = {
    display: 'flex'
}

const LayerButton = () => (
    <FloatingActionButton mini={true} style={style} onClick={() => setState({ on: !state.on })}>
    <MapsLayers />
    </FloatingActionButton>
);

export default LayerButton;