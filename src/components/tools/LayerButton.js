import React from 'react';
import Button from 'material-ui/Button';
import Layers from 'material-ui-icons/Layers';

const style = {
    marginBottom: 10
}

export default function LayerButton(props) {
    return (
        <Button onClick={() => props.handleClick()}>
            <Layers />
        </Button>
    );
}