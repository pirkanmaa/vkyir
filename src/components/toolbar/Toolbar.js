import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LayerButton from './LayerButton';
import ShareButton from './ShareButton';

const styles = {
    button: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '1rem',
        left: '1rem',
        zIndex: 9999
    }
}

function Toolbar(props) {
    const { classes } = props;
    return (
        <div className={classes.button}>
            <LayerButton handleClick={() => props.toggleLayerDrawer()} />
            {/*<ShareButton handleClick={() => props.toggleShare()} />*/}
        </div>
    );
}

export default withStyles(styles)(Toolbar)