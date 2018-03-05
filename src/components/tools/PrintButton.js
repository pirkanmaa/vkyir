import React from 'react';
import Button from 'material-ui/Button';
import Print from 'material-ui-icons/Print';
import Tooltip from 'material-ui/Tooltip';

export default function PrintButton() {
    return (
        <Tooltip id="printButtonTooltip" title="Print" placement="bottom-start">
            <Button size='small'>
                <Print />
            </Button>
        </Tooltip>
    );
}