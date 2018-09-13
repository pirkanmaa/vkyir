import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import Gallery from 'react-grid-gallery';

//const imageBase = require.context(CLIENT_APP_PATH, true, /\.(gif|png|JPG|JPEG|jpe?g|svg)$/);

const URL = 'https://tieto.pirkanmaa.fi/data/vkyir/images/';

class ImageGallery extends Component {

    state = {
        imageData: [],
        images: []
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.imageData !== prevState.imageData) {
            return {
                imageData: nextProps.imageData,
                images: nextProps.imageData.length > 0 && nextProps.imageData.map(
                    image => ({
                        src: `${URL}/${image.folder}/${image.src}`,
                        thumbnail: `${URL}/${image.folder}/${image.thumb}`,
                        thumbnailWidth: 140,
                        thumbnailHeight: 70,
                        caption: 'seppo'
                    })
                )
            }
        }
    }

    render() {

        return (
            <div>
                {this.state.images.length > 0 ?
                <Gallery
                    images={this.state.images}
                    enableImageSelection={false}
                /> : <Typography>Kohteesta ei ole kuvia saatavilla.</Typography>
            }
            </div>
        );
    }
}

export default ImageGallery;