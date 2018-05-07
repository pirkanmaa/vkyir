import React from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import { UserContext } from '../../App';

export default function LoginBar(props) {
    return (
        <UserContext.Consumer>
            {user => {
                return (
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={props.loginBarVisibility}
                        autoHideDuration={2000}
                        onClose={props.handleClose}
                        SnackbarContentProps={{ 'aria-describedby': 'loginmessage' }}
                        action={<Button color="secondary" size="small" onClick={props.handleClose}>OK</Button>}
                        message={<span id="loginmessage">You are now {user === 'admin' ? 'logged in' : 'logged out'}</span>}
                        />
                    )
                }}
        </UserContext.Consumer>
    );
}