import React from 'react';
import Button from 'material-ui/Button';
import DonutSmall from 'material-ui-icons/DonutSmall';
import Tooltip from 'material-ui/Tooltip';

export default function ChartButton(props) {
    return (
        <Tooltip id="chartButtonTooltip" title="Charts" placement="bottom-start">
            <Button size='small' onClick={() => props.handleClick()}>
                <DonutSmall />
            </Button>
        </Tooltip>
    );
}