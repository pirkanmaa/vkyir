import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';

const style = {
    display: 'flex',
    right: '1em',
    bottom: '1em',
    margin: 10,
    position: 'absolute'
}

class ToggleButton extends Component {
    render() {
        return (
            <FloatingActionButton mini={true} style={style} onClick={() => this.props.handleClick()}>
                <ActionSettings />
            </FloatingActionButton>
        );
    }
}

export default ToggleButton;