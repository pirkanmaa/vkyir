import React, { Component } from 'react';
import Map from './components/Map';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import LayerControl from './components/LayerControl';
import Toolbar from './components/Toolbar';

class App extends Component {
    constructor() {
        super();
        this.state = {
            showLayerControl: false
        };
    }

    /* Toggle LayerControl (drawer) */
    toggleLayerControl = () => {
        this.setState({showLayerControl: !this.state.showLayerControl});
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div className='app'>
                    <Map></Map>
                    <LayerControl drawerStatus={this.state.showLayerControl}>
                    </LayerControl>
                    <Toolbar toggleDrawer={this.toggleLayerControl}>
                    </Toolbar>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default App;
