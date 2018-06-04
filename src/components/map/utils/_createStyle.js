import React, { Component } from 'react';

/* OpenLayers */
import Style from 'ol/style/style';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
import Circle from 'ol/style/circle';

/* Callback function for generating style for an OpenLayers feature */
const _createStyle = style => feature => {

    let fill;
    let stroke = new Stroke({
        color: style.stroke,
        width: style.strokeWidth
    });

    /* Get colors for different data classification methods */
    if (style.type === 'single') {
        fill = new Fill({ color: style.fill });
    } else if (style.type === 'categorical') {
        let index = style.fieldValues.findIndex(value => value === feature.get(style.fieldSelection));
        fill = new Fill({ color: index !== -1 ? style.fill[index] : 'rgba(0,0,0,0)' });
    } else if (style.type === 'quantitative') {
        let index = style.fieldValues.findIndex(value => feature.get(style.fieldSelection) >= value.lowerBound && feature.get(style.fieldSelection) < value.upperBound);
        fill = new Fill({ color: index !== -1 ? style.fill[index] : 'rgba(0,0,0,0)' });
    };

    /* Apply styles according to feature geometry type (point, polygon, polyline) */
    switch (feature.getGeometry().getType()) {
        case 'MultiPoint': case 'Point':
            return new Style({
                image: new Circle({
                    radius: style.radius,
                    fill: fill,
                    stroke: stroke
                })
            }); break;
        case 'MultiPolygon': case 'Polygon':
            return new Style({ fill: fill, stroke: stroke }); break;
        case 'LineString': case 'MultiLineString':
            return new Style({ stroke: stroke });
    }
}

export default _createStyle;