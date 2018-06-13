import React, { Component } from 'react';

import Drawer from 'material-ui/Drawer';

import { withStyles } from 'material-ui/styles';
import GridList from 'material-ui/GridList';
import GridListTile from 'material-ui/GridList';
import GridListTileBar from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

const imageBase = require.context(CLIENT_APP_PATH, true, /\.(gif|png|JPG|JPEG|jpe?g|svg)$/);

const styles = theme => ({
    root: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)'
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background: '#FFF'
    },
    image: {
        display: 'flex'
    },
    paper: {
        height: '184px'
    }
});

class ImageGallery extends Component {

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Drawer
                    classes={{ paper: classes.paper }}
                    variant='persistent'
                    anchor='bottom'
                    open={this.props.galleryVisibility}
                    onClick={this.props.toggleGallery}>

                    <div className={classes.root}>
                        <GridList className={classes.gridList} cols={3} cellHeight={'auto'}>
                            {
                                this.props.imageData.length > 0 ? this.props.imageData.map(image => (
                                    <GridListTile key={image.img} cols={1}>
                                        <img src={imageBase(`./${image.folder}/${image.img}`)} alt={image.title} />
                                    </GridListTile>
                                )) : <GridListTile key={0} className={classes.image}><Typography>Kohteesta ei ole saatavilla kuvia</Typography></GridListTile>
                            }
                        </GridList>
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(ImageGallery)