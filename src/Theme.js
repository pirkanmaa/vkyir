import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
// import * as Colors from 'material-ui/styles/colors';
// import { fade } from 'material-ui/utils/colorManipulator';

const Theme = () => {
    let overwrites = {
        "floatingActionButton": {
            "miniSize": 20,
            "buttonSize": 40
        }
    };
    return getMuiTheme(darkBaseTheme, overwrites);
}

export default Theme;