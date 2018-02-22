import React, { Component } from 'react';
import ZoomIn from './tools/ZoomIn';
import ZoomOut from './tools/ZoomOut';
import ShareButton from './tools/ShareButton';
import LayerButton from './tools/LayerButton';

const style = {
    margin: 20,
    display: 'flex'
}

class Toolbar extends Component {
    /* Function to notify parent if LayerButton was clicked */
    layerButtonClicked = () => {
        this.props.toggleDrawer();
    }

    zoomIn = () => {
        this.props.zoom();
    }

    render() {
        return (
            <div className='toolBar'>
                <LayerButton handleClick={this.layerButtonClicked}/>
                <ShareButton></ShareButton>
                <ZoomIn></ZoomIn>
                <ZoomOut></ZoomOut>
            </div>
        );
    }
}

export default Toolbar;