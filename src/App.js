import React, { Component } from 'react';
import Reboot from 'material-ui/Reboot';
import Map from './components/map/Map';
import { dark, light } from './Theme';
import { MuiThemeProvider } from 'material-ui/styles';
import ChartContainer from './components/chart/ChartContainer';
import Toolbar from './components/toolbar/Toolbar';
import LoginDialog from './components/login/LoginDialog';
import ToggleButton from './components/toolbar/ToggleButton';
const queryString = require('query-string');

class App extends Component {
    state = {
        showChart: false,
        showLayerControl: false,
        showToolbar: true,
        showLogin: false,
        logged: false,
        theme: light
    };

    /* Material UI togglers */
    toggleLayerControl = () => this.setState({ showLayerControl: !this.state.showLayerControl });
    toggleToolbar = () => this.setState({ showToolbar: !this.state.showToolbar });
    toggleLogin = () => this.setState({ showLogin: !this.state.showLogin });
    toggleChart = () => this.setState({ showChart: !this.state.showChart });

    /* Switch Themes */
    switchTheme = () => this.setState({ theme: this.state.theme === dark && light || this.state.theme === light && dark });

    /* Get url query parameters. Is this the right place? Is it f*ck */
    componentDidMount() {
        let query = queryString.parse(this.props.location.search);
        if (query.zoom) {
            console.log(query.zoom);
        }
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
