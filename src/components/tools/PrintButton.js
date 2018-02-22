import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionPrint from 'material-ui/svg-icons/action/print';

const style = {
    marginBottom: 40
}

const PrintButton = () => (
    <FloatingActionButton mini={true} style={style}>
        <ActionPrint />
    </FloatingActionButton>
);

export default PrintButton;