import React from 'react';

const _getCapabilities = () => {
    this.setState({ loading: true });
    fetch(this.state.url).then(response => response.text()
    ).then(xml => {
        this.setState({ loading: false });
        let result = fastXmlParser.parse(xml);
        this.setState({ availableLayers: result[Object.keys(result)[0]].FeatureTypeList.FeatureType });
        this.setState({ layerName: this.state.availableLayers[0].Name });
    }).catch(error => console.error('Error:', error));
}

export default _getCapabilities;