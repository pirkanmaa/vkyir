import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import LockButton from './tools/LockButton';
import LayerButton from './tools/LayerButton';
import ShareButton from './tools/ShareButton';
import PrintButton from './tools/PrintButton';
import RaisedButton from 'material-ui/RaisedButton';
import ZoomIn from './tools/ZoomIn';
import ZoomOut from './tools/ZoomOut';

const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'none',
    right: '1rem',
    width: 'auto',
    boxShadow: 'none',
    // pointerEvents: 'none'
}

export default class Toolbar extends Component {

    layerButtonClicked = () => { this.props.toggleLayerControl(); }
    lockClicked = () => { this.props.toggleLogin(); }
    zoomInClicked = () => { this.props.zoomIn(); }
    zoomOutClicked = () => { this.props.zoomOut(); }

    render() {
        return (
            <div>
                <Drawer openSecondary={true} open={this.props.toolbarVisibility} containerStyle={style}>
                    <LockButton handleClick={this.lockClicked} />
                    <LayerButton handleClick={this.layerButtonClicked} />
                    <ShareButton />
                    <PrintButton />
                    <ZoomIn handleClick={this.zoomInClicked} />
                    <ZoomOut handleClick={this.zoomOutClicked} />
                </Drawer>
            </div>
        );
    }
}