import React from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import { AlertContext } from '../App';

export default function AlertBar(props) {
    return (
        <AlertContext.Consumer>
            {alert => {
                return (
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={props.alertVisibility}
                        autoHideDuration={2000}
                        onClose={props.alertClose}
                        SnackbarContentProps={{ 'aria-describedby': 'alert' }}
                        action={<Button color="secondary" size="small" onClick={props.alertClose}>OK</Button>}
                        message={<span id="alert">{alert}</span>}
                    />
                )
            }}
        </AlertContext.Consumer>
    );
}