import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Map from './components/map/Map';
import { dark, light } from './Theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Toolbar from './components/toolbar/Toolbar';
import AlertBar from './components/AlertBar';

const queryString = require('query-string');

/* Context for in-app alerts */
const AlertContext = React.createContext('alert');

/* Context for data */
const DataContext = React.createContext('data');

const alerts = {
    'share': 'Link to map view copied to clipboard'
};

class App extends Component {

    state = {
        user: {},
        showChart: false,
        showLayerDrawer: false,
        showToolbar: true,
        showLogin: false,
        showAlert: false,
        showPrint: false,
        logged: false,
        theme: light,
        extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244],
        alert: '',
        data: ''
    };

    /* Set data*/
    setData = data => {
        this.setState({ data: data });
    };

    /* Material UI togglers */
    toggleLayerDrawer = () => this.setState({ showLayerDrawer: !this.state.showLayerDrawer });


    toggleShare = () => {
        this.setState({ alert: alerts.share });
        this.setState({ showAlert: true });
    }

    alertClose = () => { this.setState({ showAlert: false }); };

    /* Switch Themes */
    switchTheme = () => this.setState({ theme: this.state.theme === dark && light || this.state.theme === light && dark });

    /* Updates the url query string based on urlQuery object parameter */
    urlQueryString = (urlQuery) => {
        let newQuery = '?';
        urlQuery.forEach((item, index) => {
            let key = Object.keys(item)[0];
            let value = item[key];
            (index !== 0) ? (newQuery += '&') : false;
            newQuery += `${key}=${value}`;
        });
        this.props.history.push(({ search: newQuery }));
    }

    /* Get url query parameters. Is this the right place? Is it f*ck */
    componentDidMount() {
        let query = queryString.parse(this.props.location.search);
        // Set joom from query string
        if (query.z) {
            this.setState({ zoom: Number(query.z) });
        }
        // Set center from query string
        if (query.x && query.y) {
            /* Jatkossa nämä extentit pitäisi saada view.getProjection().getExtent():stä. Onnistuuko context APIlla? */
            /* Tässä nyt vedetty nollille, pitäisi vaihtaa että ottaa initial centeristä koordinaatit, mutta mitäs jos centeriä on mennyt välissä räpläämään...
            if (query.x < this.state.extent[0] || query.x > this.state.extent[2]) {
                query.x = this.state.center[0]
            }
            if (query.y < this.state.extent[1] || query.y > this.state.extent[3]) {
                query.y = this.state.center[1]
            } */
            this.setState({ center: [Number(query.x), Number(query.y)] });
        }
        // Set basemap from url
        if (query.b) {
            this.setState({ basemap: query.b });
        }
    }

    render() {
        return (
            <MuiThemeProvider theme={this.state.theme}>
                <div className='app'>
                    <CssBaseline />
                    <DataContext.Provider value={this.state.data}>
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
                    </DataContext.Provider>
                    <Toolbar
                        toggleLayerDrawer={this.toggleLayerDrawer}
                        toggleShare={this.toggleShare}
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

export { App, AlertContext, DataContext };