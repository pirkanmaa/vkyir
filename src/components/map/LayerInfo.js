import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// Dialog with action buttons. The actions are passed in as an array of React objects.

export default class LayerInfo extends Component {
    render() {
        return (
            <div>
                <Dialog
                    disableRestoreFocus={true}
                    open={this.props.layerInfoVisibility}
                    aria-labelledby="login-dialog-title"
                    onClose={this.props.toggleLayerInfo}>
                    <DialogTitle id="login-dialog-title">{this.props.infoLayer}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{this.props.layerInfo}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.toggleLayerInfo} color="primary">OK</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}