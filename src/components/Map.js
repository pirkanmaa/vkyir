import React, { Component } from 'react';

const styles = {
    Map: {
        background: 'black',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        minHeight: '400px',
        minWidth: '600px'
    }
}

class Map extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div style={styles.Map}>
                <h3> Here be the Map </h3>
            </div>
        );
    }
};

export default Map;
