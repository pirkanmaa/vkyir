import React, { Component } from 'react';

const styles = {
    toolbar: {
        background: 'rgba(0, 0, 0, 0.4)',
        minWidth: '50px',
        minHeight: '30%',
        position: 'absolute',
        top: '25%',
        right: '15%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        color: 'white',
        width: '1px',
        wordWrap: 'break-word'
    }
}

class Toolbar extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div style={styles.toolbar}>
                <h2 style={styles.header}> TOOLBAR </h2>
            </div>
        );
    }
}

export default Toolbar;
