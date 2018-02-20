import React, { Component } from 'react';
import Map from './components/Map';
import MapTheme from './components/MapTheme';
import Toolbar from './components/Toolbar';

const styles = {
    app: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        background: '#27db48',
        padding: '40px',
        minWidth: '800px',
        minHeight: '600px',
        fontFamily: 'monospace'
    },
    header: {
        position: 'absolute',
        top: '40px',
    }
}

class App extends Component {
    constructor(){
    	super();
    	this.state = {
            number: 123,
        };
    }

    render() {
        return (
            <div style={styles.app}>
                <h1 style={styles.header}> App container </h1>
                <MapTheme></MapTheme>
                <Map></Map>
                <Toolbar></Toolbar>
            </div>
        );
    }
}

export default App;
