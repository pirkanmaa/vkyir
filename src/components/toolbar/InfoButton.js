import React from 'react';
import Button from '@material-ui/core/Button';
import Info from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export default function InfoButton(props) {
    return (
        <Tooltip id="layerButtonTooltip" title="Tieto palvelusta" placement="bottom-start">
            <IconButton color="primary" onClick={() => props.handleClick()}>
                <Info />
            </IconButton>
        </Tooltip>
    );
}