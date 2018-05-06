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
            <LoginButton handleClick={() => props.toggleLogin()} />
            <UserContext.Consumer>
                {user => {
                    if (user === 'admin') {
                        return (<div> {user} </div>)
                    } else {
                        return (<div> not admin {user} </div>)
                    }}}
            </UserContext.Consumer>
            {false ? <LayerButton handleClick={() => props.toggleLayerControl()} /> : null}
            <ChartButton handleClick={() => props.toggleChart()}/>
            <ShareButton />
            <PrintButton />
        </Drawer>
    );
}

export default withStyles(styles)(Toolbar)
