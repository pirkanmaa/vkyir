import React, { Component } from 'react';
import Map from './components/Map';

const styles = {
    app: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        background: 'orange',
        padding: '40px'
    },
    header: {
        position: 'absolute',
        top: '40px'
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
                <Map> </Map>
            </div>
        );
    }
}

export default App;
