import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Share from 'material-ui-icons/Share';
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

export default class ShareButton extends Component {

    render() {
        return (
            <div>
                <Tooltip id="shareButtonTooltip" title="Share" placement="bottom-start">
                    <Button size='small' onClick={() => {
                        this.props.handleClick();
                        copyTextToClipboard(location.href);
                    }}>
                        <Share />
                    </Button>
                </Tooltip>
            </div>
        );
    }
}