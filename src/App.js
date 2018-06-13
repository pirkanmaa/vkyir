import React, { Component } from "react";
import CssBaseline from 'material-ui/CssBaseline';
import Map from './components/map/Map';
import { dark, light } from './Theme';
import { MuiThemeProvider } from 'material-ui/styles';
import ChartContainer from './components/chart/ChartContainer';
import Toolbar from './components/toolbar/Toolbar';
import AlertBar from './components/AlertBar';
import LoginDialog from './components/login/LoginDialog';
import ToggleButton from './components/toolbar/ToggleButton';
import UserController from './controllers/UserController';

const queryString = require('query-string');

/* Context for providing user information */
const UserContext = React.createContext('peasant');

/* Context for in-app alerts */
const AlertContext = React.createContext('alert');

/* Context for data */
const DataContext = React.createContext('data');

const alerts = {
    'login': 'You are now logged in',
    'logout': 'You are now logged out',
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

    /* API function calls */
    handleLogin = (loginData) => {
        // Close login dialog
        this.toggleLogin();
        console.log('Authentication user:', loginData);
        UserController.authenticateUser().then(response => {
            if (response.ok) {
                response.json().then(json => {
                    // Authentication OK
                    this.setState({ user: json.user });
                    this.setState({ alert: alerts.login });
                    this.setState({ showAlert: true });
                });
            } else {
                console.log('Auth failed, use dummy auth');
                // Authentication FAILED, set dummy auth
                if (loginData.username === 'admin' && loginData.password === 'password') {
                    this.setState({ user: loginData });
                    this.setState({ alert: alerts.login });
                    this.setState({ showAlert: true });
                }
            }
        }).catch((err) => {
            console.log('Error', err);
        });
    };

    /* Handle logging out user */
    handleLogout = () => {
        this.setState({ user: {} });
        this.setState({ alert: alerts.logout });
        this.setState({ showAlert: true });
    };

    /* Set data*/
    setData = data => {
        this.setState({ data: data });
    };

    /* Material UI togglers */
    toggleLayerDrawer = () => this.setState({ showLayerDrawer: !this.state.showLayerDrawer });
    toggleToolbar = () => this.setState({ showToolbar: !this.state.showToolbar });
    toggleLogin = () => this.setState({ showLogin: !this.state.showLogin });
    toggleChart = () => this.setState({ showChart: !this.state.showChart });
    togglePrint = () => {};

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
            <UserContext.Provider value={this.state.user.username}>
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
                            <ChartContainer
                                chartVisibility={this.state.showChart}
                            />
                        </DataContext.Provider>
                        <Toolbar
                            handleLogout={this.handleLogout}
                            toolbarVisibility={this.state.showToolbar}
                            toggleLayerDrawer={this.toggleLayerDrawer}
                            toggleLogin={this.toggleLogin}
                            toggleChart={this.toggleChart}
                            toggleShare={this.toggleShare}
                            togglePrint={this.togglePrint}
                        />
                        {/*<ToggleButton*
                            toggleToolbar={this.toggleToolbar}
                        />*/}
                        <LoginDialog
                            handleLogin={this.handleLogin}
                            toggleLogin={this.toggleLogin}
                            loginDialogVisibility={this.state.showLogin}
                        />
                        <AlertContext.Provider value={this.state.alert}>
                            <AlertBar
                                alertVisibility={this.state.showAlert}
                                alertClose={this.alertClose}
                            />
                        </AlertContext.Provider>
                    </div>
                </MuiThemeProvider>
            </UserContext.Provider>
        );
    }
}

export { App, UserContext, AlertContext, DataContext };