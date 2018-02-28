import React from 'react';
import Drawer from 'material-ui/Drawer';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import LockButton from './tools/LockButton';
import LayerButton from './tools/LayerButton';
import ChartButton from './tools/ChartButton';
import ShareButton from './tools/ShareButton';
import PrintButton from './tools/PrintButton';
import ZoomIn from './tools/ZoomIn';
import ZoomOut from './tools/ZoomOut';

const styles = {
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'none',
        width: 'auto',
        boxShadow: 'none',
    }
}

function Toolbar(props) {
    const { classes } = props;
    return (
        <Drawer variant='persistent' anchor='right' open={props.toolbarVisibility} classes={{paper: classes.paper}}>
            <LockButton handleClick={() => props.toggleLogin()} />
            <LayerButton handleClick={() => props.toggleLayerControl()} />
            <ChartButton />
            <ShareButton />
            <PrintButton />
            <ZoomIn handleClick={() => props.zoomIn()} />
            <ZoomOut handleClick={() => props.zoomOut()} />
        </Drawer>
    );
}


Toolbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Toolbar)