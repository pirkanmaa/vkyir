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
        showChart: false,
        showLayerControl: false,
        showToolbar: true,
        showLogin: false,
        logged: false
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

    toggleChart = () => {
        this.setState({ showChart: !this.state.showChart });
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
                    <ChartContainer
                        chartVisibility={this.state.showChart}
                    />
                    <Toolbar
                        toolbarVisibility={this.state.showToolbar}
                        toggleLayerControl={this.toggleLayerControl}
                        toggleLogin={this.toggleLogin}
                        toggleChart={this.toggleChart}
                    />
                    {/*<ToggleButton*
                        toggleToolbar={this.toggleToolbar}
                    />*/}
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