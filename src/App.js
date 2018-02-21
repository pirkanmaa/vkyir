import React, { Component } from 'react';
import Map from './components/Map';
import LayerControl from './components/LayerControl';
import Toolbar from './components/Toolbar';

class App extends Component {
    constructor(){
    	super();
    	this.state = {
            number: 123,
        };
    }

    render() {
        return (
            <div className='app'>
                <h1 className='header'> App container </h1>
                <LayerControl></LayerControl>
                <Map></Map>
                <Toolbar></Toolbar>
            </div>
        );
    }
}

export default App;