import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Settings from 'material-ui-icons/Settings';

const styles = {
    button: {
        right: '1rem',
        top: '1rem',
        position: 'absolute',
        zIndex: '1301'
    }
}

function ToggleButton(props) {
    const { classes } = props;
    return (
        <Button variant='fab' mini={true} aria-label='toggle' className={classes.button} onClick={() => props.toggleToolbar()}>
            <Settings />
        </Button>
    );
}

export default withStyles(styles)(ToggleButton);