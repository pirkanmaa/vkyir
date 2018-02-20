import React, { Component } from 'react';

const styles = {
    map: {
        background: 'rgba(0, 0, 0, 0.4)',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        minWidth: '70%',
        minHeight: '90%',
        margin: '10px'
    }
}

class Map extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div style={styles.map}>
                <h2> Here be the Map </h2>
            </div>
        );
    }
};

export default Map;
