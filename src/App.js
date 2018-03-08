import React, { Component } from 'react';
import Reboot from 'material-ui/Reboot';
import Map from './components/Map';
import { DarkTheme, LightTheme } from './Theme';
import { MuiThemeProvider } from 'material-ui/styles';
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
        logged: false,
        theme: LightTheme
    };

    /* Toggle Map Layer Control Drawer */
    toggleLayerControl = () => {
        this.setState({ showLayerControl: !this.state.showLayerControl });
    }

    /* Toggle Toolbar */
    toggleToolbar = () => {
        this.setState({ showToolbar: !this.state.showToolbar });
    }

    /* Toggle Login Dialog */
    toggleLogin = () => {
        this.setState({ showLogin: !this.state.showLogin });
    }

    /* Toggle Chart Paper */
    toggleChart = () => {
        this.setState({ showChart: !this.state.showChart });
    }

    /* Switch Themes */
    switchTheme = () => {
        this.setState({ theme: this.state.theme === DarkTheme && LightTheme || this.state.theme === LightTheme && DarkTheme });
    }

    render() {
        return (
            <MuiThemeProvider theme={this.state.theme}>
                <div className='app'>
                    <Reboot />
                    <Map
                        theme={this.state.theme}
                        switchTheme={this.switchTheme}
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