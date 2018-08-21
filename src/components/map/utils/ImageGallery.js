import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';

const imageBase = require.context(CLIENT_APP_PATH, true, /\.(gif|png|JPG|JPEG|jpe?g|svg)$/);

const styles = theme => ({
    gridList: {
        height: '100%',
        width: 320
    }
});

class ImageGallery extends Component {

    render() {

        const { classes } = this.props;

        return (
            <div>
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
        );
    }
}

export default withStyles(styles)(ImageGallery)