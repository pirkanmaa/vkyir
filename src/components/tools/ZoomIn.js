import React from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const style = {
  marginBottom: 5
}

export default function ZoomIn(props) {
    return (
      <Button mini={true} style={style} onClick={() => props.handleClick()}>
        <AddIcon />
      </Button>
    );
}