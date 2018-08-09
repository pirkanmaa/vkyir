import React from 'react';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Circle from 'ol/style/Circle';

const stroke = new Stroke({
    color: '#ffcc00',
    width: 2
});
const stroke2 = new Stroke({
    color: '#355384',
    width: 3
});
const fill = new Fill({
    color: 'rgba(0,0,0,0.0)'
});

const highlightStyle = feature => {
    switch (feature.getGeometry().getType()) {
        case 'MultiPoint': case 'Point':
            return new Style({
                image: new Circle({
                    radius: 8,
                    stroke: stroke2
                })
            }); break;
        case 'MultiPolygon': case 'Polygon':
            return new Style({ fill: fill, stroke: stroke }); break;
        case 'LineString': case 'MultiLineString':
            return new Style({ stroke: stroke });
    }
};

const featureOverlay = new VectorLayer({
    source: new VectorSource(),
    style: feature => highlightStyle(feature)
});

export default featureOverlay;