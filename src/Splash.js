import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Info from '@material-ui/icons/Info';

// Dialog with action buttons. The actions are passed in as an array of React objects.

export default class Splash extends Component {

    render() {
        return (
            <div>
                <Dialog
                    disableRestoreFocus={true}
                    open={this.props.splashVisibility}
                    aria-labelledby="login-dialog-title"
                    onClose={this.props.toggleSplash}>
                    <DialogTitle id="login-dialog-title">Tieto palvelusta</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Tietoa palvelusta
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.toggleSplash} color="primary">OK</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}