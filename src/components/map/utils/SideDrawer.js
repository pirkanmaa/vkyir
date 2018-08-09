import React, { Component } from 'react';

import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import ImageGallery from './ImageGallery';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Linkify from 'react-linkify';

const imageBase = require.context(CLIENT_APP_PATH, true, /\.(gif|png|JPG|JPEG|jpe?g|svg)$/);

const styles = theme => ({
    root: {
        position: 'absolute',
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: 320
    },
    paper2: {
        width: 319,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        overflow: 'hidden'
    },
    typography: {
        padding: 5
    },
    typography2: {
        hyphens: 'auto',
        overflowWrap: 'normal',
        wordBreak: 'normal',
        paddingRight: 5
    }
});

const blackList = ['id', 'vestyid'];

class SideDrawer extends Component {

    render() {

        const { classes } = this.props;
        let description = []; 
        Object.entries(this.props.featureInfo).map(entry => {
            let title;
            if (blackList.indexOf(entry[0]) == -1) {
                console.log(entry[1]);
                switch (entry[0]) {
                    case 'toteutukse': title = 'Totetuksen tilanne'; break;
                    case 'tyyppi': title = 'Toimenpito'; break;
                    case 'nimi': title = 'Kohteen nimi'; break;
                    case 'kuvaus': title = 'Kohteen kuvaus'; break;
                    case 'kustannukset': title = 'Kustannukset'; break;
                    case 'toteutusvuosi': title = 'Ajankohta'; break;
                    case 'lisatietoa': title = entry[1] !== null ? 'Lisätietoa' : null; break;
                }
            description.push(<div><Typography variant="title">{title}</Typography><Typography classes={{ root: classes.typography2 }} align='left'><Linkify>{entry[1]}</Linkify></Typography><br/></div>);
            }
        })

        return (
            <div>
                <Drawer
                    classes={{ paper: classes.paper }}
                    variant='persistent'
                    anchor='right'
                    open={this.props.galleryVisibility}
                    onClick={this.props.toggleGallery}>

                    <div className={classes.root}>
                        <AppBar position='static'><Typography classes={{ root: classes.typography }} variant="title" color="inherit">{this.props.featureInfo.tyyppi}</Typography></AppBar>
                        <Paper classes={{ root: classes.paper2 }}>
                            {description}
                            <ImageGallery imageData={this.props.imageData}></ImageGallery>
                        </Paper>
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(SideDrawer)