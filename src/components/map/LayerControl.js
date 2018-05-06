import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Checkbox from 'material-ui/Checkbox';
import { FormLabel, FormControl, FormGroup, FormControlLabel } from 'material-ui/Form';
import Layers from './layers/Layers';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '1rem',
    paddingTop: '1rem',
  }
}

class LayerControl extends Component {

  state = {
    visibility: Layers.map((item, index) => item.visibility)
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <FormControl component="fieldset" required classes={{ root: classes.root }}>
          <FormGroup
            aria-label="layers"
            name="layers"
          >
            {Layers.map((item, index) => (
              <FormControlLabel
                key={index}
                label={item.title}
                control={
                  <Checkbox
                    key={index}
                    checked={this.state.visibility[index]}
                    value={item.name}
                    onChange={(event) => {
                      this.props.toggleLayer(event)
                      this.setState({visibility: this.state.visibility.map(function(item, i) { return i === index ? !item : item })})
                    }}
                  />
                }
              />
            ))}
          </FormGroup>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(LayerControl)