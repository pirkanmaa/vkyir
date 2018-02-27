import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MapsLayers from 'material-ui/svg-icons/maps/layers';
import MapsLayersClear from 'material-ui/svg-icons/maps/layers-clear';

const style = {
    marginBottom: 10
}

export default class LayerButton extends Component {
    render() {
        return (
            <FloatingActionButton style={style} onClick={() => this.props.handleClick()}>
                <MapsLayers />
            </FloatingActionButton>
        );
    }
}