import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Share from 'material-ui-icons/Share';
import ShareBar from './../ShareBar';
export default class ShareButton extends Component {

    state = {
        open: false
    };

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Button size='small' onClick={this.handleClick}>
                    <Share />
                </Button>
                <ShareBar shareBarVisibility={this.state.open} handleClose={this.handleClose}/>
            </div>
        );
    }
}