import React from 'react';
import featureOverlay from './../layers/FeatureOverlay';

let highlight;
/* Function for "highlighting" selected feature via style */
const highlightFeature = (feature, map) => {

    //let feature = map.forEachFeatureAtPixel(pixel, feature => feature);
    if (feature) {
        if (highlight === undefined) {
            featureOverlay.getSource().addFeature(feature);
            highlight = feature;
        } else {
            if (highlight === feature) {
                featureOverlay.getSource().removeFeature(feature);
                highlight = undefined;
            } else if (highlight !== feature) {
                featureOverlay.getSource().removeFeature(highlight);
                featureOverlay.getSource().addFeature(feature);
                highlight = feature;
            }
        }
    } else {
        if (highlight !== undefined) {
            featureOverlay.getSource().removeFeature(highlight);
            highlight = undefined;
        }
    }
};

export default highlightFeature;