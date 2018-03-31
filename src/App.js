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
        theme: light,
        zoom: 7,
        center: [2650000, 8750000],
        extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244]
    };

    /* Material UI togglers */
    toggleLayerControl = () => this.setState({ showLayerControl: !this.state.showLayerControl });
    toggleToolbar = () => this.setState({ showToolbar: !this.state.showToolbar });
    toggleLogin = () => this.setState({ showLogin: !this.state.showLogin });
    toggleChart = () => this.setState({ showChart: !this.state.showChart });

    /* Switch Themes */
    switchTheme = () => this.setState({ theme: this.state.theme === dark && light || this.state.theme === light && dark });

    handleTesti = (urlQuery) => {
        console.log('testi', urlQuery);
        this.props.history.push(({search: 'zebra=ok'}));
    }

    /* Get url query parameters. Is this the right place? Is it f*ck */
    componentDidMount() {
        console.log('query muuttui');
        let query = queryString.parse(this.props.location.search);
        if (query.z) { this.setState({ zoom: Number(query.z) }); }
        if (query.x && query.y) {
            /* Jatkossa nämä extentit pitäisi saada view.getProjection().getExtent():stä. Onnistuuko context APIlla? */
            /* Tässä nyt vedetty nollille, pitäisi vaihtaa että ottaa initial centeristä koordinaatit, mutta mitäs jos centeriä on mennyt välissä räpläämään... */
            if (query.x < this.state.extent[0] || query.x > this.state.extent[2]) { query.x = this.state.center[0] };
            if (query.y < this.state.extent[1] || query.y > this.state.extent[3]) { query.y = this.state.center[1] };
            this.setState({ center: [Number(query.x),Number(query.y)] });
        }
    }

    render() {
        return (
            <MuiThemeProvider theme={this.state.theme}>
                <div className='app'>
                    <Reboot />
                    <Map
                        zoom={this.state.zoom}
                        center={this.state.center}
                        theme={this.state.theme}
                        switchTheme={this.switchTheme}
                        layerControlVisibility={this.state.showLayerControl}
                        testi={this.handleTesti}
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
