import React from 'react';
import Button from 'material-ui/Button';
import Lock from 'material-ui-icons/Lock';

export default function LockButton(props) {
    return (
        <Button size='small' onClick={() => props.handleClick()}>
            <Lock />
        </Button>
    );
}