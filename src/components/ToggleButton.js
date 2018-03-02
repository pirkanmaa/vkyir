import React from 'react';
import PropTypes from 'prop-types';
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
        <Button variant='fab' mini={true} aria-label='toggle' color='primary' className={classes.button} onClick={() => props.toggleToolbar()}>
            <Settings />
        </Button>
    );
}

ToggleButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToggleButton);
