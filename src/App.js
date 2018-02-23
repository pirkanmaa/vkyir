import React, { Component } from 'react';
import Map from './components/Map';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import LayerControl from './components/LayerControl';
import Toolbar from './components/Toolbar';

class App extends Component {

    state = {
        showLayerControl: false,
        showToolbar: true,
        center: [1100000, 7600000],
        zoom: 7,
        maxZoom: 10,
        minZoom: 7,
        zoomStep: 0.25
    };

    /* Toggle Map Layer Control Drawer */
    toggleLayerControl = () => {
        this.setState({ showLayerControl: !this.state.showLayerControl });
    }

    toggleToolbar = () => {
        this.setState({ showToolbar: !this.state.showToolbar });
    }

    /* Map Zoomers */
    zoomIn = () => {
        if(this.state.zoom < this.state.maxZoom) {
            this.setState({ zoom: this.state.zoom + this.state.zoomStep });
        }
    }

    zoomOut = () => {
        if(this.state.zoom > this.state.minZoom) {
            this.setState({ zoom: this.state.zoom - this.state.zoomStep });
        }
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div className='app'>
                    <Map
                        zoom={this.state.zoom}
                        minZoom={this.state.minZoom}
                        maxZoom={this.state.maxZoom}
                        center={this.state.center}
                    />
                    <LayerControl
                        layerControlVisibility={this.state.showLayerControl}
                        />
                    <Toolbar
                        toolbarVisibility={this.state.showToolbar}
                        toggleLayerControl={this.toggleLayerControl}
                        toggleToolbar={this.toggleToolbar}
                        zoomIn={this.zoomIn}
                        zoomOut={this.zoomOut}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}
export default App;