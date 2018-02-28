import React from 'react';
import Button from 'material-ui/Button';
import Share from 'material-ui-icons/Share';

const style = {
    marginBottom: 10
}

export default function ShareButton() {
    return (
        <Button style={style}>
            <Share />
        </Button>
    );
}