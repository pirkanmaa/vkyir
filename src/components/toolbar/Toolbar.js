import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LayerButton from './LayerButton';
import InfoButton from './InfoButton';

const styles = {
    button: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '1rem',
        left: '1rem',
        zIndex: 2000
    },
    button2: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '1rem',
        left: '17rem',
        zIndex: 2000
    }
}

function Toolbar(props) {
    const { classes } = props;
    return (
        <div className={props.layerDrawerVisibility ? classes.button2: classes.button}>
            <LayerButton handleClick={() => props.toggleLayerDrawer()} />
            <InfoButton handleClick={() => props.toggleSplash()} />
        </div>
    );
}

export default withStyles(styles)(Toolbar)