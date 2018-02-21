import React, { Component } from 'react';
import ZoomButtons from './tools/ZoomButtons';
import ShareButton from './tools/ShareButton';
import LayerButton from './tools/LayerButton';

const style = {
    margin: 20,
    display: 'flex'
}

class Toolbar extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='toolBar'>
            <LayerButton></LayerButton>
            <ShareButton></ShareButton>
            <ZoomButtons></ZoomButtons>
            </div>
        );
    }
}

export default Toolbar;