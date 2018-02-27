import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionLock from 'material-ui/svg-icons/action/lock';
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open';

const style = {
    top: '0rem',
    position: 'absolute',
    display: 'flex'
}

export default class LockButton extends Component {
    render() {
        return (
            <FloatingActionButton style={style} onClick={() => this.props.handleClick()}>
                <ActionLock />
            </FloatingActionButton>
        );
    }
}