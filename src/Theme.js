import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import amber from '@material-ui/core/colors/amber';
import blueGrey from '@material-ui/core/colors/blueGrey';

export const dark = createMuiTheme({
    palette: {
        type: 'dark',
        primary: blueGrey,
        secondary: lightBlue
    }
});

export const light = createMuiTheme({
    palette: {
        type: 'light',
        primary: blueGrey,
        secondary: amber
    }
});