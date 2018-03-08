import React from 'react';
import Button from 'material-ui/Button';
import Layers from 'material-ui-icons/Layers';
import Tooltip from 'material-ui/Tooltip';

export default function LayerButton(props) {
    return (
        <Tooltip id="layerButtonTooltip" title="Layers" placement="bottom-start">
            <Button size='small' onClick={() => props.handleClick()}>
                <Layers />
            </Button>
        </Tooltip>
    );
}