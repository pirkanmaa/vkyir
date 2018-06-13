import React from 'react';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import Print from 'material-ui-icons/Print';

export default function PrintButton(props) {
    return (
        <Tooltip id="printButtonTooltip" title="Print" placement="bottom-start">
            <Button size='small' onClick={() => props.handleClick()}>
                <Print />
            </Button>
        </Tooltip>
    );
}