import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Lock from 'material-ui-icons/Lock';

/*const style = {
    top: '0rem',
    position: 'absolute',
    display: 'flex'
}*/

export default class LockButton extends Component {
    render() {
        return (
            <Button /*style={style}*/ onClick={() => this.props.handleClick()}>
                <Lock />
            </Button>
        );
    }
}