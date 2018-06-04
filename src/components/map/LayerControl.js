import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Checkbox from 'material-ui/Checkbox';
import { FormLabel, FormControl, FormGroup, FormControlLabel } from 'material-ui/Form';
import Layers from './layers/Layers';
import { UserContext } from '../../App';
import Clear from 'material-ui-icons/Clear';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import LayerAdder from './LayerAdder';
import Add from 'material-ui-icons/Add';

const styles = theme => ({
  root: {
    display: 'flex',
    paddingLeft: '1rem',
    paddingTop: '1rem',
  },
  superContainer: {
    width: '250px'
  },
  button: {
    position: 'absolute',
    right: '8px'
  },
  addButton: {
    paddingLeft: '14px'
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  }
})

class LayerControl extends Component {

  state = {
    show: { "visibility": Layers.map(item => item.visibility), "title": Layers.map(item => item.title) },
    showLayerAdder: false
  }

  toggleLayerAdder = () => this.setState({ showLayerAdder: !this.state.showLayerAdder });
  closeLayerAdder = () => this.setState({ showLayerAdder: false });

  toggleVisibility = event => {
    this.props.toggleLayer(event)
    let index = this.state.show.title.findIndex(title => title === event.target.value);
    let show = Object.assign({}, this.state.show);
    show.visibility = show.visibility.map((item, i) => { return i === index ? !item : item });
    this.setState({ show });
    console.log(this.state.show);
  }

  removeLayer = buttonName => {
    let layer = this.props.map.getLayers().getArray().filter(layer => layer.getProperties().title === buttonName);
    let index = this.state.show.title.findIndex(title => title === buttonName);

    this.setState({
      show: {
        "visibility": this.state.show.visibility.filter((item, i) => i !== index),
        "title": this.state.show.title.filter((item, i) => i !== index)
      }
    });

    this.props.map.removeLayer(...layer);
  };

  render() {

    const { classes } = this.props;

    return (
      <UserContext.Consumer>
        {user => {
          return (
            <div className={classes.superContainer}>
              <FormControl component="fieldset" required classes={{ root: classes.root }}>
                <FormGroup
                  aria-label="layers"
                  name="layers"
                >
                  {Layers.map((item, index) => (
                    this.state.show.title.indexOf(item.title) > -1 &&
                    <div key={index}>
                      <FormControlLabel
                        key={'A' + index}
                        label={item.title}
                        control={
                          <Checkbox
                            key={'B' + index}
                            checked={this.state.show.visibility[this.state.show.title.indexOf(item.title)]}
                            value={item.name}
                            onChange={this.toggleVisibility}
                          />
                        }
                      />
                      {
                        user && user !== '' && (
                          <IconButton value={item.title} key={'C' + index} className={classes.button} onClick={() => this.removeLayer(item.title)}>
                            <Clear />
                          </IconButton>
                        )
                      }
                    </div>
                  ))}
                </FormGroup>
              </FormControl>

              {user && user !== '' && (

                <div>
                  <Button onClick={this.toggleLayerAdder} className={classes.addButton}>
                    <Add className={classes.leftIcon} />Add map layer
                    </Button>
                  <LayerAdder
                    showLayerAdder={this.state.showLayerAdder}
                    closeLayerAdder={this.closeLayerAdder}
                    setData={this.props.setData}
                    map={this.props.map}>
                  </LayerAdder>
                </div>
              )
              }

            </div>
          )
        }}
      </UserContext.Consumer>
    );
  }
}

export default withStyles(styles)(LayerControl)