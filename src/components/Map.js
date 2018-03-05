import React, { Component } from 'react';
import OLMap from 'ol/map';
import View from 'ol/view';
import Zoom from 'ol/control/zoom';
import ScaleLine from 'ol/control/scaleline';
import ZoomIn from './map/ZoomIn';
import ZoomOut from './map/ZoomOut';
import Basemaps from './map/basemaps/Basemaps';
import LayerControl from './LayerControl';
//import './../styles/ol-styles.css';

const styles = {
    map: {
        height: '100vh',
        margin: 0
    }
}

let view = new View;
let scaleLine = new ScaleLine({

});

export default class Map extends Component {

    state = {
        center: [2650000, 8750000],
        zoom: 10,
        maxZoom: 10,
        minZoom: 7,
        zoomStep: 0.1,
        basemap: "CartoLight",
        basemapOpacity: 1
    };

    componentDidMount() {

        view.setCenter(this.state.center);
        view.setZoom(this.state.zoom);
        view.setMaxZoom(this.state.maxZoom);
        view.setMinZoom(this.state.minZoom);

        // Testin vuoksi mäpätty basemaps

        let map = new OLMap({
            target: 'map',
            layers: Basemaps.map(function (layer) { return layer["layer"]; }),
            view: view,
            controls: [scaleLine]
        });

        // Bind "map" to state
        this.setState({ map: map });

        map.on('moveend', () => {
            this.setState({ zoom: view.getZoom() });
        });
    }

    /* Map Zoomers */
    zoomIn = () => {
        if (this.state.zoom < this.state.maxZoom) {
            this.setState({ zoom: this.state.zoom + this.state.zoomStep });
        }
    }

    zoomOut = () => {
        if (this.state.zoom > this.state.minZoom) {
            this.setState({ zoom: this.state.zoom - this.state.zoomStep });
        }
    }

    /* Basemap switcher */
    changeBasemap = (event, value) => {

        let layers = this.state.map.getLayers().getArray();
        layers.filter(function (item, index) {
            return item.getProperties().type === 'base' && (item.getProperties().name === value && layers[index].setVisible(true) ||
                item.getProperties().name !== value && layers[index].setVisible(false));
        });

        this.setState({ basemap: value });

        // Change theme colour as well,
        // Not yet bound to whether the selected basemap has "theme" value "dark" or "light"
        // this.props.switchTheme();
    };

    changeBasemapOpacity = () => {

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.zoom !== prevState.zoom) {
            view.setZoom(this.state.zoom);
        }
    }

    render() {
        return (
            <div>
                <ZoomIn handleClick={this.zoomIn} />
                <ZoomOut handleClick={this.zoomOut} />
                <LayerControl
                    layerControlVisibility={this.props.layerControlVisibility}
                    handleChange={this.changeBasemap}
                    basemap={this.state.basemap}
                    basemapOpacity={this.state.basemapOpacity}
                    changeBasemapOpacity={this.changeBasemapOpacity}
                />
                <div id='map' style={styles.map} />
            </div>
        );
    }
};