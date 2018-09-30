import React from 'react';
import Button from '@material-ui/core/Button';
import Help from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';

export default function InfoButton(props) {
    return (
        <Tooltip id="layerButtonTooltip" title="Tieto palvelusta" placement="bottom-start">
            <Button style={{marginLeft:'0.5rem'}} variant="fab" mini color="primary" onClick={() => props.handleClick()}>
                <Help />
            </Button>
        </Tooltip>
    );
}