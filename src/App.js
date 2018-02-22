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
            showLayerControl: false,
            zoom: 7,
            center: [1100000, 7600000]
        };
    }

    /* Toggle LayerControl (drawer) */
    toggleLayerControl = () => {
        this.setState({ showLayerControl: !this.state.showLayerControl });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div className='app'>
                    <Map 
                        zoom={this.state.zoom}
                        center={this.state.center}
                    />
                    <LayerControl drawerStatus={this.state.showLayerControl}/>
                    <Toolbar toggleDrawer={this.toggleLayerControl}/>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default App;
