import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionPrint from 'material-ui/svg-icons/action/print';

const style = {
    marginBottom: 100
}

export default class PrintButton extends Component {
    render() {
        return (
            <FloatingActionButton mini={true} style={style}>
                <ActionPrint />
            </FloatingActionButton>
        );
    }
}