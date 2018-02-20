import React, { Component } from 'react';

const styles = {
    themeBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.4)',
        color: 'white',
        minWidth: '10%',
        margin: '10px'
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
