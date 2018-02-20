import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/styles.scss';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        React.createElement(App),
        document.getElementById('react-test')
    );
});
