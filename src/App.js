import React, { Component } from 'react';
import Reboot from 'material-ui/Reboot';
import Map from './components/Map';
import Theme from './Theme';
import { MuiThemeProvider } from 'material-ui/styles';
import LayerControl from './components/LayerControl';
import ChartContainer from './components/ChartContainer';
import Toolbar from './components/Toolbar';
import LoginDialog from './components/LoginDialog';
import ToggleButton from './components/ToggleButton';

class App extends Component {

    state = {
        showLayerControl: false,
        showToolbar: true,
        showLogin: false,
        logged: false,
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

    toggleLogin = () => {
        this.setState({ showLogin: !this.state.showLogin });
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

    render() {
        return (
            <MuiThemeProvider theme={Theme}>
                <div className='app'>
                    <Reboot />
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
                        toggleLogin={this.toggleLogin}
                        zoomIn={this.zoomIn}
                        zoomOut={this.zoomOut}
                    />
                    <ToggleButton
                        toggleToolbar={this.toggleToolbar}
                    />
                    <LoginDialog
                        toggleLogin={this.toggleLogin}
                        loginDialogVisibility={this.state.showLogin}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}
export default App;