import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import BasemapControl from './BasemapControl';
import LayerControl from './LayerControl';
import Divider from 'material-ui/Divider';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Layers from 'material-ui-icons/Layers';

const styles = {
  paper: {
    width: '250px'
  },
  root: {
    paddingLeft: '8px',
    paddingTop: '0px',
    paddingRight: '0px'
  }
}

class LayerDrawer extends Component {

  state = {
    expanded: 'panel',
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {

    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div>
        <Drawer
          classes={{ paper: classes.paper }}
          variant='persistent'
          anchor='left'
          open={this.props.layerDrawerVisibility}>

          <ExpansionPanel defaultExpanded expanded={expanded === 'panel'} onChange={this.handleChange('panel')}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography>Map layers</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails classes={{ root: classes.root }}>
              <LayerControl
                maplayers={this.props.maplayers}
                toggleLayer={this.props.toggleLayer}
                setData={this.props.setData}
                map={this.props.map}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel defaultExpanded expanded={expanded === 'panel'} onChange={this.handleChange('panel')}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography>Basemaps</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails classes={{ root: classes.root }}>
              <BasemapControl
                changeBasemap={this.props.changeBasemap}
                basemap={this.props.basemap}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(LayerDrawer)
