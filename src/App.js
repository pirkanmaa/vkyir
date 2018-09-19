import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Map from './components/map/Map';
import { dark, light } from './Theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Toolbar from './components/toolbar/Toolbar';
import AlertBar from './components/AlertBar';
import Splash from './components/Splash';

const queryString = require('query-string');

/* Context for in-app alerts */
const AlertContext = React.createContext('alert');

const alerts = {
    'share': 'Link to map view copied to clipboard'
};

class App extends Component {

    state = {
        showSplash: true,
        showLayerDrawer: true,
        zoom: 9.5,
        showAlert: false,
        logged: false,
        theme: light,
        extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244],
        alert: ''
    };

    /* Material UI togglers */
    toggleLayerDrawer = () => this.setState({ showLayerDrawer: !this.state.showLayerDrawer });
    toggleSplash = () => this.setState({ showSplash: !this.state.showSplash });
    toggleShare = () => {
        this.setState({ alert: alerts.share });
        this.setState({ showAlert: true });
    }

    alertClose = () => { this.setState({ showAlert: false }); };

    /* Switch Themes */
    switchTheme = () => this.setState({ theme: this.state.theme === dark && light || this.state.theme === light && dark });

    render() {
        return (
            <MuiThemeProvider theme={this.state.theme}>
                <div className='app'>
                    <CssBaseline />
                    <Map
                        basemap={this.state.basemap}
                        zoom={this.state.zoom}
                        center={this.state.center}
                        theme={this.state.theme}
                        switchTheme={this.switchTheme}
                        layerDrawerVisibility={this.state.showLayerDrawer}
                        updateUrl={this.urlQueryString}
                        setData={this.setData}
                    />
                    <Toolbar
                        showLayerDrawer={this.state.showLayerDrawer}
                        toggleLayerDrawer={this.toggleLayerDrawer}
                        toggleShare={this.toggleShare}
                        toggleSplash={this.toggleSplash}
                    />
                    <Splash
                        splashVisibility={this.state.showSplash}
                        toggleSplash={this.toggleSplash}
                    />
                    <AlertContext.Provider value={this.state.alert}>
                        <AlertBar
                            alertVisibility={this.state.showAlert}
                            alertClose={this.alertClose}
                        />
                    </AlertContext.Provider>
                </div>
            </MuiThemeProvider>
        );
    }
}

export { App, AlertContext };