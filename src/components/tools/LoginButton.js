import React from 'react';
import Button from 'material-ui/Button';
import Lock from 'material-ui-icons/Lock';
import Tooltip from 'material-ui/Tooltip';

export default function LoginButton(props) {
    return (
        <Tooltip id="loginButtonTooltip" title="Login" placement="bottom-start">
            <Button size='small' onClick={() => props.handleClick()}>
                <Lock />
            </Button>
        </Tooltip>
    );
}