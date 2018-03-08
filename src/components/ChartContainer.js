import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Zoom from 'material-ui/transitions/Zoom';

const styles = {
  root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'white',
      border: 'none',
      width: '20%',
      height: '25%',
      boxShadow: 'none',
      right: '1rem',
      top: '1rem',
      position: 'absolute'
  }
}

function ChartContainer(props) {
  const { classes } = props;
  return (
    <div>
      <Zoom in={props.chartVisibility}>
        <Paper classes={{root: classes.root}}>
          Charts 'n' shit
        </Paper>
      </Zoom>
    </div>
  );
}

export default withStyles(styles)(ChartContainer)