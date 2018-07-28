import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

export const dark = createMuiTheme({
    palette: {
        type: 'dark'
    }
});

export const light = createMuiTheme({
    palette: {
        type: 'light'
    }
});