import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionLock from 'material-ui/svg-icons/action/lock';
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open';

const style = {
    margin: 10
}

class LockButton extends Component {
    render() {
        return (
            <FloatingActionButton mini={true} style={style}>
                <ActionLock />
            </FloatingActionButton>
        );
    }
}

export default LockButton;