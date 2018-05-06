import React from 'react';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';
import LoginButton from './LoginButton';
import LayerButton from './LayerButton';
import ChartButton from './ChartButton';
import ShareButton from './ShareButton';
import PrintButton from './PrintButton';
import {UserContext} from '../../App';

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
            <LayerButton handleClick={() => props.toggleLayerDrawer()} />
            <UserContext.Consumer>
                {user => {
                    if (user && user !== '') {
                        return (<LoginButton handleClick={() => props.handleLogout()} />);
                    } else {
                        return (<LoginButton handleClick={() => props.toggleLogin()} />);
                    }
                }}
            </UserContext.Consumer>
            <ChartButton handleClick={() => props.toggleChart()}/>
            <ShareButton />
            <PrintButton />
        </Drawer>
    );
}

export default withStyles(styles)(Toolbar)
