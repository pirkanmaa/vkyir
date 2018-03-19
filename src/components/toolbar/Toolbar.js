import React from 'react';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';
import LoginButton from './LoginButton';
import LayerButton from './LayerButton';
import ChartButton from './ChartButton';
import ShareButton from './ShareButton';
import PrintButton from './PrintButton';

const styles = {
    paper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'none',
        border: 'none'
    }
}

function Toolbar(props) {
    const { classes } = props;
    return (
        <Drawer variant='persistent' anchor='right' open={props.toolbarVisibility} classes={{paper: classes.paper}}>
            <LoginButton handleClick={() => props.toggleLogin()} />
            <LayerButton handleClick={() => props.toggleLayerControl()} />
            <ChartButton handleClick={() => props.toggleChart()}/>
            <ShareButton />
            <PrintButton />
        </Drawer>
    );
}

export default withStyles(styles)(Toolbar)
