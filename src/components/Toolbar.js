import React from 'react';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';
import LoginButton from './tools/LoginButton';
import LayerButton from './tools/LayerButton';
import ChartButton from './tools/ChartButton';
import ShareButton from './tools/ShareButton';
import PrintButton from './tools/PrintButton';

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