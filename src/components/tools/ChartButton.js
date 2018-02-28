import React, { Component } from 'react';
import Button from 'material-ui/Button';
import DonutSmall from 'material-ui-icons/DonutSmall';

const style = {
    marginBottom: 10
}

export default class ShareButton extends Component {
    render() {
        return (
            <Button variant="fab" color="secondary" style={style}>
                <DonutSmall />
            </Button>
        );
    }
}