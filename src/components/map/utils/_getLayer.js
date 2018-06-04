import React from 'react';

const _getLayer = (url, layer, props) => {
    const URL = url.replace('GetCapabilities', `GetFeature&typeName=${layer}&srsName=EPSG:3857&outputFormat=json`);
    this.setState({ loading: true });
    fetch(URL).then(response => response.json()
    ).then(json => {

        /* Transform data into an object of key: array pairs with all values
        
        let data = json.features.reduce((data, feat) => {
            Object.keys(feat.properties).forEach(key => {
                return data[key] = !data[key] ? [feat.properties[key]] : [...data[key], feat.properties[key]];
            })
            return data;
        }, {});

        */

        let data = json.features.map(feature => feature.properties);
        this.setState({ data });
        props.setData(data);
        this.setState({ loading: false });
        this.setState({ featureType: json.features[0].geometry.type });
    }).catch(error => console.error('Error:', error));
}

export default _getLayer;
