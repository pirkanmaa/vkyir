import React, { Component } from 'react';

import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ImageGallery from './ImageGallery';
import Linkify from 'react-linkify';

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
        overflowY: 'auto',
        overflowX: 'hidden',
        width: 340,
        zIndex: '1600'
    },
    paper2: {
        width: 339,
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 15,
        overflow: 'hidden'
    },
    typography: {
        padding: 5,
        fontSize: '1.2 rem',
        fontWeight: 600
    },
    typography2: {
        paddingRight: 5,
        fontSize: '0.7 rem'
    },
    typography3: {
        paddingBottom: 5,
        fontSize: '0.7 rem',
        fontWeight: 600
    }
});

const blackList = ['id', 'vestyid', 'FID', 'fid', 'bbox', 'geometry', 'geom'];

class SideDrawer extends Component {

    render() {

        const { classes } = this.props;
        let description = [];
        Object.entries(this.props.featureInfo).map((entry,index) => {
            let title;
            if (blackList.indexOf(entry[0]) == -1) {
                switch (entry[0]) {
                    case 'toteutukse': title = 'Toteutuksen tilanne'; break;
                    case 'tyyppi': title = 'Toimenpide'; break;
                    case 'nimi': title = 'Kohteen nimi'; break;
                    case 'kuvaus': title = 'Kohteen kuvaus'; break;
                    case 'kustannukset': title = 'Kustannukset'; break;
                    case 'toteutusvuosi': title = 'Ajankohta'; break;
                    case 'lisatietoa': title = entry[1] !== null ? 'Lisätietoa' : null; break;
                }
                description.push(
                    <div key={index}>
                        <Typography variant="button" classes={{ root: classes.typography3 }}>{title}</Typography>
                        <Typography classes={{ root: classes.typography2 }} align='left'>
                            <Linkify properties={{ target: '_blank' }}>{entry[1]}</Linkify>
                        </Typography><br/>
                    </div>
                );
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
                        <AppBar position='static'><Typography classes={{ root: classes.typography }} color="inherit">{this.props.featureInfo.tyyppi}</Typography></AppBar>
                        <Paper classes={{ root: classes.paper2 }}>
                            {description}
                            <Typography variant="button" classes={{ root: classes.typography3 }}>Kuvia kohteesta</Typography>
                            <ImageGallery imageData={this.props.imageData}></ImageGallery>
                        </Paper>
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(SideDrawer)