import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Print from 'material-ui-icons/Print';

const style = {
    marginBottom: 100
}

export default class PrintButton extends Component {
    render() {
        return (
            <Button style={style}>
                <Print />
            </Button>
        );
    }
}