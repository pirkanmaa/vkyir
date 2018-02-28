import React from 'react';
import Button from 'material-ui/Button';
import Lock from 'material-ui-icons/Lock';

/*const style = {
    top: '0rem',
    position: 'absolute',
    display: 'flex'
}*/

export default function LockButton(props) {
    return (
        <Button /*style={style}*/ onClick={() => props.handleClick()}>
            <Lock />
        </Button>
    );
}