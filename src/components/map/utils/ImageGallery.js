import React, { Component } from 'react';

import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const imageBase = require.context(CLIENT_APP_PATH, true, /\.(gif|png|JPG|JPEG|jpe?g|svg)$/);

const styles = theme => ({
    root: {
        position: 'absolute',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        height: '100%',
        width: 320
    },
    title: {
        color: theme.palette.primary.light,
    },
    paper: {
        width: 320
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
                    anchor='right'
                    open={this.props.galleryVisibility}
                    onClick={this.props.toggleGallery}>

                    <div className={classes.root}>
                        {Object.entries(this.props.featureInfo).map(entry => {
                            return <div><Typography variant="title">{entry[0]}</Typography><Typography>{entry[1]}</Typography></div>
                        })}
                        <GridList className={classes.gridList} cols={2} cellHeight={160}>
                            {
                                this.props.imageData.length > 0 ? this.props.imageData.map(image => (
                                    <GridListTile key={image.img} cols={image.cols || 1}>
                                        <img src={imageBase(`./${image.folder}/${image.img}`)} alt={image.title} />
                                    </GridListTile>
                                )) : <GridListTile key={'empty'} cols={1}><Typography>Kohteesta ei ole saatavilla kuvia</Typography></GridListTile>
                            }
                        </GridList>
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(ImageGallery)