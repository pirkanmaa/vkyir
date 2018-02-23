import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import ToggleButton from './tools/ToggleButton';
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
    height: '50%',
    top: '25%',
    bottom: '25%',
    right: '1em',
    width: 'auto'
}

class Toolbar extends Component {

    toggleButtonClicked = () => { this.props.toggleToolbar(); }
    layerButtonClicked = () => { this.props.toggleLayerControl(); }
    zoomInClicked = () => { this.props.zoomIn(); }
    zoomOutClicked = () => { this.props.zoomOut(); }

    render() {
        return (
            <div>
                <ToggleButton handleClick={this.toggleButtonClicked} />
                <Drawer openSecondary={true} open={this.props.toolbarVisibility} containerStyle={style}>
                    <LockButton />
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

export default Toolbar;