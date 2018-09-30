import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Dialog with action buttons. The actions are passed in as an array of React objects.

class LayerInfo extends Component {

    render() {

        const classes = this.props;

        return (
            <div>
                <Dialog
                    disableRestoreFocus={true}
                    open={this.props.layerInfoVisibility}
                    aria-labelledby="login-dialog-title"
                    onClose={this.props.toggleLayerInfo}>
                    <DialogTitle id="login-dialog-title">{this.props.infoLayer}</DialogTitle>
                    <DialogContent>
                        <DialogContentText paragraph={true} align='justify' style={{ color: 'black', marginBottom: 0 }}>
                            {this.props.layerInfo && this.props.layerInfo.split('<br>').map((text, i) => { return i==0 ? text : <span><br /><br />{text}</span> })}
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

export default LayerInfo