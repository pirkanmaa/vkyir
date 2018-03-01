import React from 'react';
import Button from 'material-ui/Button';
import DonutSmall from 'material-ui-icons/DonutSmall';

export default function ShareButton(props) {
    return (
        <Button size='small' onClick={() => props.handleClick()}>
            <DonutSmall />
        </Button>
    );
}