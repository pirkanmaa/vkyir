import React from 'react';
import Button from 'material-ui/Button';
import Layers from 'material-ui-icons/Layers';

export default function LayerButton(props) {
    return (
        <Button size='small' onClick={() => props.handleClick()}>
            <Layers />
        </Button>
    );
}