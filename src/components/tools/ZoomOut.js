import React from 'react';
import Button from 'material-ui/Button';
import RemoveIcon from 'material-ui-icons/Remove';

export default function ZoomOut(props) {
  return (
    <Button mini={true} onClick={() => props.handleClick()}>
      <RemoveIcon />
    </Button>
  );
}