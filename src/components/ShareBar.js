import React from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

export default function ShareBar(props) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={props.shareBarVisibility}
            autoHideDuration={4000}
            onClose={props.handleClose}
            SnackbarContentProps={{ 'aria-describedby': 'sharemessage' }}
            message={<span id="sharemessage">Link to map view copied to clipboard</span>}

            action={
                <Button color="secondary" size="small" onClick={props.handleClose}>
                    OK
                </Button>
            }
        />
    );
}