import React from 'react';
import Button from 'material-ui/Button';
import DonutSmall from 'material-ui-icons/DonutSmall';

export default function ShareButton(props) {
    return (
        <Button onClick={() => props.handleClick()}>
            <DonutSmall />
        </Button>
    );
}