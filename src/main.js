import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import 'normalize.css/normalize.css';
import './styles/styles.scss';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        React.createElement(App),
        document.getElementById('app')
    );
});