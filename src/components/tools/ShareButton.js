import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Share from 'material-ui/svg-icons/social/share';

const style = {
    margin: 20,
    display: 'flex'
}

const ShareButton = () => (
    <FloatingActionButton mini={true} style={style}>
    <Share />
    </FloatingActionButton>
);

export default ShareButton;