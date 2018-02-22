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

    layerButtonClicked = () => { this.props.toggleDrawer(); }
    zoomInClicked = () => { this.props.zoomIn(); }
    zoomOutClicked = () => { this.props.zoomOut(); }

    render() {
        return (
            <div className='toolBar'>
                <LayerButton handleClick={this.layerButtonClicked}/>
                <ShareButton></ShareButton>
                <ZoomIn handleClick={this.zoomInClicked}/>
                <ZoomOut handleClick={this.zoomOutClicked}/>
            </div>
        );
    }
}

export default Toolbar;