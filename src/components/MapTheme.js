import React, { Component } from 'react';

const styles = {
    themeBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        background: 'black',
        color: 'white',
        minWidth: '20%',
        margin: '20px'
    }
}

class MapTheme extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div style={styles.themeBar}>
                <h3> Map Themes </h3>
            </div>
        );
    }
}

export default MapTheme;
