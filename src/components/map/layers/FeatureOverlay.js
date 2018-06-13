import React from 'react';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import Fill from 'ol/style/fill';

const highlightStyle = new Style({
    stroke: new Stroke({
        color: '#ffcc00',
        width: 2
    }),
    fill: new Fill({
        color: 'rgba(0,0,0,0.0)'
    })
});

const featureOverlay = new VectorLayer({
    source: new VectorSource(),
    style: feature => highlightStyle
});

export default featureOverlay;