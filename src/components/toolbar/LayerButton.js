import React from 'react';
import Button from '@material-ui/core/Button';
import Layers from '@material-ui/icons/Layers';
import Tooltip from '@material-ui/core/Tooltip';

export default function LayerButton(props) {
    return (
        <Tooltip id="layerButtonTooltip" title="Karttatasot" placement="bottom-start">
            <Button variant="fab" color="primary" onClick={() => props.handleClick()}>
                <Layers />
            </Button>
        </Tooltip>
    );
}