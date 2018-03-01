import React from 'react';
import Drawer from 'material-ui/Drawer';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import LockButton from './tools/LockButton';
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
            <LockButton handleClick={() => props.toggleLogin()} />
            <LayerButton handleClick={() => props.toggleLayerControl()} />
            <ChartButton handleClick={() => props.toggleChart()}/>
            <ShareButton />
            <PrintButton />
        </Drawer>
    );
}


Toolbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Toolbar)
