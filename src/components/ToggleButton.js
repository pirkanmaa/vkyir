import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';

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
            <Button onClick={() => this.props.toggleToolbar()}>
                <Icon>settings</Icon>
            </Button>
        );
    }
}