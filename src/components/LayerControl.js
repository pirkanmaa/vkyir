import React from 'react';
import Drawer from 'material-ui/Drawer';
import { MenuItem } from 'material-ui/Menu';

export default function LayerControl(props) {
    return (
      <div>
        <Drawer
          variant='persistent'
          anchor='left'
          open={props.layerControlVisibility}>

          <MenuItem> Map layers </MenuItem>
          <MenuItem> Basemaps </MenuItem>

        </Drawer>
      </div>
    );
}