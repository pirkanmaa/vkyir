import React from 'react';
import Button from 'material-ui/Button';
import Print from 'material-ui-icons/Print';

const style = {
    marginBottom: 100
}

export default function PrintButton() {
    return (
        <Button style={style}>
            <Print />
        </Button>
    );
}