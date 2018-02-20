import React, { Component } from 'react';
import MapComponent from './components/MapComponent';

const styles = {
    app: {
        background: 'orange',
        padding: '50px'
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
                <MapComponent> </MapComponent>
            </div>
        );
    }
}

export default App;
