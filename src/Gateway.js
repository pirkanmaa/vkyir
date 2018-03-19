import React, { Component } from 'react';
import App from './App';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Gateway extends Component {
    render() {
        return (
            <Router>
                <Route exact path='/' component={App}/>
            </Router>
        );
    }
}

export default Gateway;
