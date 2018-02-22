import React, { Component } from 'react';
import LockButton from './tools/LockButton';
import LayerButton from './tools/LayerButton';
import ShareButton from './tools/ShareButton';
import PrintButton from './tools/PrintButton';
import ZoomIn from './tools/ZoomIn';
import ZoomOut from './tools/ZoomOut';

const style = {
    margin: 20,
    display: 'flex'
}

class Toolbar extends Component {

    layerButtonClicked = () => { this.props.toggleDrawer(); }
    zoomInClicked = () => { this.props.zoomIn(); }
    zoomOutClicked = () => { this.props.zoomOut(); }

    render() {
        return (
            <div className='toolBar'>
                <LockButton/>
                <LayerButton handleClick={this.layerButtonClicked} />
                <ShareButton/>
                <PrintButton/>
                <ZoomIn handleClick={this.zoomInClicked} />
                <ZoomOut handleClick={this.zoomOutClicked} />
            </div>
        );
    }
}

export default Toolbar;