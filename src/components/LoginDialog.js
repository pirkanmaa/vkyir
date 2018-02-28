import React, { Component } from 'react';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

// Dialog with action buttons. The actions are passed in as an array of React objects.

export default class LoginDialog extends Component {

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.loginDialogVisibility}
                    aria-labelledby="login-dialog-title"
                    onClose={this.props.toggleLogin}
                >
                    <DialogTitle id="login-dialog-title">Log in</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter your username
                        </DialogContentText>
                        <TextField
                            autoFocus
                            type='email'
                            label="username (e-mail)"
                            id='username'
                        //onChange={(event, newValue) => this.setState({ username: newValue })}
                        />
                        <br />
                        <DialogContentText>
                            Enter your password
                        </DialogContentText>
                        <TextField
                            type="password"
                            label="password"
                        //onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.toggleLogin} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.toggleLogin} color="secondary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}