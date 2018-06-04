import React, { Component } from 'react';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

// Dialog with action buttons. The actions are passed in as an array of React objects.

export default class LoginDialog extends Component {
    state = {
        usernameInput: '',
        passwordInput: ''
    };

    usernameChanged = (event) => {
        this.setState({ usernameInput: event.target.value });
    };

    passwordChanged = (event) => {
        this.setState({ passwordInput: event.target.value });
    };

    resetFields = () => {
        this.setState({ usernameInput: '', passwordInput: '' });
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.loginDialogVisibility}
                    aria-labelledby="login-dialog-title"
                    onClose={this.props.toggleLogin}>
                    <DialogTitle id="login-dialog-title">Log in</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            type='email'
                            helperText="username (e-mail)"
                            id='username'
                            value={this.state.usernameInput}
                            onChange={this.usernameChanged}
                        />
                        <br />
                        <TextField
                            type="password"
                            helperText="password"
                            id="password"
                            value={this.state.passwordInput}
                            onChange={this.passwordChanged}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.resetFields();
                            this.props.toggleLogin();
                        }} color="primary">
                            Cancel
                            </Button>
                        <Button onClick={() => {
                            this.resetFields();
                            this.props.handleLogin(
                                {
                                    username: this.state.usernameInput,
                                    password: this.state.passwordInput
                                }
                            )
                        }} color="primary">
                            Submit
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
