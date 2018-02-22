import React, { Component } from 'react';
import ZoomButtons from './tools/ZoomButtons';
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

    render() {
        return (
            <div className='toolBar'>
                <LayerButton handleClick={this.layerButtonClicked}/>
                <ShareButton></ShareButton>
                <ZoomButtons></ZoomButtons>
            </div>
        );
    }
}

export default Toolbar;