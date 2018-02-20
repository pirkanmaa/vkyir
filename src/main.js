import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './styles/styles.scss';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        React.createElement(Root),
        document.getElementById('react-test')
    );
});