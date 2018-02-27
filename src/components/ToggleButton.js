import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';

const style = {
    display: 'flex',
    right: '1rem',
    bottom: '1rem',
    position: 'absolute',
    zIndex: '1301'
}

export default class ToggleButton extends Component {
    render() {
        return (
            <FloatingActionButton style={style} onClick={() => this.props.toggleToolbar()}>
                <ActionSettings />
            </FloatingActionButton>
        );
    }
}