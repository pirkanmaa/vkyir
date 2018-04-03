import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Share from 'material-ui-icons/Share';
import ShareBar from './ShareBar';
import Tooltip from 'material-ui/Tooltip';

function copyTextToClipboard(text) {

    let textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();

    try {
        let successful = document.execCommand('copy');
        let msg = successful ? 'successful' : 'unsuccessful';
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
}

function CopyLink() {
    copyTextToClipboard(location.href);
}

export default class ShareButton extends Component {

    state = {
        open: false
    };

    handleClick = () => {
        this.setState({ open: true });
        CopyLink();
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Tooltip id="shareButtonTooltip" title="Share" placement="bottom-start">
                    <Button size='small' onClick={this.handleClick}>
                        <Share />
                    </Button>
                </Tooltip>
                <ShareBar
                    shareBarVisibility={this.state.open}
                    handleClose={this.handleClose}
                />
            </div>
        );
    }
}
