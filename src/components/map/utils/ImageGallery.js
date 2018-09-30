import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Gallery from 'react-grid-gallery';

const URL = `https://tieto.pirkanmaa.fi/ikaalinen/images/`;
const styles = {
    img: {
        width: '300px',
        maxWidth: '300px'
    },
    gallery: {
        width: '300px',
        maxWidth: '300px'
    }
}

const getMeta = image => {
    let url = `https://tieto.pirkanmaa.fi/geoserver/pirely/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pirely:vesty_images_meta&outputFormat=application/json&PROPERTYNAME=kohde&CQL_FILTER=kohde=${parseInt(image.folder, 10)}`
    return fetch(url).then(
        response => response.json()
    ).then(
        json => {
            return
            `Kohteen kuvaaja(t): ${json.features[0].properties.authors},
            ajankohta: ${json.features[0].properties.startDate ? json.features[0].properties.startDate + '-' + json.features[0].properties.endDate : json.features[0].properties.endDate}.`
        }
    )
};

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
                        rowHeight: 120,
                        caption: getMeta(image)
                    })
                )
            }
        }
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.gallery}>
                {this.state.images.length > 0 ?
                    <Gallery
                        images={this.state.images}
                        enableImageSelection={false}
                        showLightboxThumbnails={true}
                    /> :
                    <Typography>Kohteesta ei ole kuvia saatavilla.</Typography>
                }
            </div>
        );
    }
}

export default withStyles(styles)(ImageGallery);