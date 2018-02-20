import React, { Component } from 'react';

const styles = {
    mapComponent: {
        background: 'black',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        minHeight: '400px',
        minWidth: '600px'
    }
}

class MapComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div style={styles.mapComponent}>
                <h3> Here be the Map </h3>
            </div>
        );
    }
};

export default MapComponent;
