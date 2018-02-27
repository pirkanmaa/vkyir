import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Share from 'material-ui/svg-icons/social/share';

const style = {
    marginBottom: 10
}

export default class ShareButton extends Component {
    render() {
        return (
            <FloatingActionButton style={style}>
                <Share />
            </FloatingActionButton>
        );
    }
}