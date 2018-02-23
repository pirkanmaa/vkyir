import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

// Dialog with action buttons. The actions are passed in as an array of React objects.

export default class LoginDialog extends Component {

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.toggleLogin}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.props.toggleLogin}
            />,
        ];

        return (
            <div>
                <Dialog contentClassName="loginDialog"
                    title="Log in"
                    actions={actions}
                    modal={false}
                    open={this.props.loginDialogVisibility}
                    onRequestClose={this.props.toggleLogin}
                >
                    <TextField
                        hintText="Enter your username"
                        floatingLabelText="Username"
                        onChange={(event, newValue) => this.setState({ username: newValue })}
                    />
                    <br />
                    <TextField
                        type="password"
                        hintText="Enter your password"
                        floatingLabelText="Password"
                        onChange={(event, newValue) => this.setState({ password: newValue })}
                    />
                </Dialog>
            </div>
        );
    }
}