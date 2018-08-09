import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    right: '1rem',
    top: '1rem',
    position: 'absolute',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const options = [
  'Hämeenkyrö',
  'Ikaalinen',
  'Jämijärvi',
  'Kankaanpää',
  'Karvia',
  'Kihniö',
  'Nokia',
  'Parkano',
  'Virrat',
  'Ylöjärvi' 
];

class KuntaFilter extends Component {

  state = {
    anchorEl: null
  };

  button = undefined;

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {

    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (

      <div className={classes.root}>
        <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="kuntafilter"
            aria-label="Valitse kuntasi"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary="Valitse kuntasi"
              secondary={options[this.props.filterSelection]}
            />
          </ListItem>
        </List>
        <Menu
          id="kuntafilter"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === this.props.filterSelection}
              onClick={(e) => {
                this.props.handleClick(e,index,option);
                this.setState({ anchorEl: null });
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(KuntaFilter);