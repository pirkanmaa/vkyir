import React from 'react';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

// Dialog with action buttons. The actions are passed in as an array of React objects.

export default function LoginDialog(props) {
    return (
        <div>
            <Dialog
                open={props.loginDialogVisibility}
                aria-labelledby="login-dialog-title"
                onClose={props.toggleLogin}>
                <DialogTitle id="login-dialog-title">Log in</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        type='email'
                        helperText="username (e-mail)"
                        id='username'
                    //onChange={(event, newValue) => this.setState({ username: newValue })}
                    />
                    <br />
                    <TextField
                        type="password"
                        helperText="password"
                        id="password"
                    //onChange={(event, newValue) => this.setState({ password: newValue })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.toggleLogin} color="primary">
                        Cancel
                        </Button>
                    <Button onClick={props.toggleLogin} color="primary">
                        Submit
                        </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
