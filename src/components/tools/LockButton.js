import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionLock from 'material-ui/svg-icons/action/lock';
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open';

const style = {
    marginBottom: 10
}

export default class LockButton extends Component {
    render() {
        return (
            <FloatingActionButton mini={true} style={style} onClick={() => this.props.handleClick()}>
                <ActionLock />
            </FloatingActionButton>
        );
    }
}