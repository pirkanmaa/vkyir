import React from 'react';
import Button from 'material-ui/Button';
import Lock from 'material-ui-icons/Lock';
import LockOpen from 'material-ui-icons/LockOpen';
import Tooltip from 'material-ui/Tooltip';
import { UserContext } from '../../App';

export default function LoginButton(props) {

    return (
        <UserContext.Consumer>
            {user => {
                if (user && user !== '') {
                    return (
                        <div>
                            <Tooltip id="loginButtonTooltip" title="Logout" placement="bottom-start">
                                <Button size='small' onClick={() => props.handleClick()}>
                                    <Lock />
                                </Button>
                            </Tooltip>
                        </div>
                    );
                }
                return (
                    <Tooltip id="loginButtonTooltip" title="Login" placement="bottom-start">
                        <Button size='small' onClick={() => props.handleClick()}>
                            <LockOpen />
                        </Button>
                    </Tooltip>
                );
            }}
        </UserContext.Consumer>
    );
}