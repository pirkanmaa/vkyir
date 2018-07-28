import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import BasemapControl from './BasemapControl';
import LayerControl from './LayerControl';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Layers from '@material-ui/icons/Layers';

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
              <Typography>Karttatasot</Typography>
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
              <Typography>Taustakartat</Typography>
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
