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
        center: [1100000, 7600000],
        zoom: 7,
        maxZoom: 10,
        minZoom: 7
    };

    /* Toggle Map Layer Control Drawer */
    toggleLayerControl = () => {
        this.setState({ showLayerControl: !this.state.showLayerControl });
    }

    /* Map Zoomers */
    zoomIn = () => {
        this.setState({ zoom: this.state.zoom <= this.state.maxZoom ? this.state.zoom + 0.5 : this.state.zoom });
    }

    zoomOut = () => {
        this.setState({ zoom: this.state.zoom >= this.state.minZoom ? this.state.zoom - 0.5 : this.state.zoom });
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
                    <LayerControl drawerStatus={this.state.showLayerControl} />
                    <Toolbar
                        toggleDrawer={this.toggleLayerControl}
                        zoomIn={this.zoomIn}
                        zoomOut={this.zoomOut}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}
export default App;