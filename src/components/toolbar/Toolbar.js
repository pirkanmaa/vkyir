import React from 'react';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';
import LoginButton from './LoginButton';
import LayerButton from './LayerButton';
import ChartButton from './ChartButton';
import ShareButton from './ShareButton';
import PrintButton from './PrintButton';
import { UserContext } from '../../App';

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
        <Drawer variant='persistent' anchor='right' open={props.toolbarVisibility} classes={{ paper: classes.paper }}>
            <UserContext.Consumer>
                {user => {
                    if (user && user !== '') {
                        return (<LoginButton handleClick={() => props.handleLogout()} />);
                    } else {
                        return (<LoginButton handleClick={() => props.toggleLogin()} />);
                    }
                }}
            </UserContext.Consumer>
            <LayerButton handleClick={() => props.toggleLayerDrawer()} />
            <ChartButton handleClick={() => props.toggleChart()} />
            <ShareButton handleClick={() => props.toggleShare()} />
            <PrintButton handleClick={() => props.togglePrint()} />
        </Drawer>
    );
}

export default withStyles(styles)(Toolbar)
