import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Zoom from 'material-ui/transitions/Zoom';

import Select from 'material-ui/Select';
import { FormControl, FormControlLabel, FormHelperText, FormGroup, FormLabel } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';

import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip } from 'Recharts';
import { DataContext } from '../../App';
import { min, max, sum, median, mean } from 'simple-statistics'
import geostats from './../../../node_modules/geostats';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'white',
    border: 'none',
    minWidth: '20%',
    minHeight: '25%',
    boxShadow: 'none',
    right: '1rem',
    top: '1rem',
    position: 'absolute'
  }
}

const blackList = ['id', 'Id', 'ID', 'fid', 'FID', 'oid', 'OID', 'code', 'CODE', 'kode', 'KODE', 'postinro', 'ponro', 'zipcode', 'tunniste'];

class ChartContainer extends Component {

  state = {
    groupBy: '',
    dataKey: '',
    stat: 'sum',
    statistic: sum
  };

  setValue = (name, data) => event => {
    this.setState({ [name]: event.target.value });
    this.calculate(data);
  };

  setStat = data => event => {

    switch (event.target.value) {
      case 'min': this.setState({ statistic: min }); break;
      case 'max': this.setState({ statistic: max }); break;
      case 'mean': this.setState({ statistic: mean }); break;
      case 'median': this.setState({ statistic: median }); break;
      case 'sum': this.setState({ statistic: sum }); break;
    };

    this.setState({ stat: event.target.value });
    this.calculate(data);

  }

  calculate = data => {

    if (this.state.dataKey && this.state.groupBy && this.state.statistic) {

      let temp = [];
      [...new Set(data.map(item => item[`${this.state.groupBy}`]))]
        .forEach(unique => {
          temp.push({
            [this.state.groupBy]: unique, [this.state.dataKey]: Number(this.state.statistic(data.reduce((sel, d) => {
              if (d[`${this.state.groupBy}`] === unique) {
                sel.push(d[`${this.state.dataKey}`]);
              } return sel;
            }, [])).toPrecision(2))
          });
        });

      this.setState({ data: temp });

    }
  }

  render() {

    const { classes } = this.props;

    return (
      <DataContext.Consumer>
        {data => {
          return (
            <div>
              <Zoom in={this.props.chartVisibility}>
                <Paper classes={{ root: classes.root }}>
                  {data && data !== '' && (
                    <div>
                      <form autoComplete="off">
                        <FormControl>
                          <InputLabel htmlFor="group">Group by</InputLabel>
                          <Select
                            value={this.state.groupBy}
                            onChange={this.setValue('groupBy', data)}
                            inputProps={{ name: 'group', id: 'group' }}
                          >
                            {Object.keys(data[0]).map((item, index) => (
                              <MenuItem
                                value={item}
                                disabled={item === this.state.dataKey}
                                key={index}
                                label={item}
                              >
                                {item}
                              </MenuItem>
                            ))}

                          </Select>
                        </FormControl>
                      </form>
                      <form autoComplete="off">
                        <FormControl>
                          <InputLabel htmlFor="dataKey">Data</InputLabel>
                          <Select
                            value={this.state.dataKey}
                            onChange={this.setValue('dataKey', data)}
                            inputProps={{ name: 'dataKey', id: 'dataKey' }}
                          >
                            {Object.keys(data[0]).map((item, index) => (
                              blackList.indexOf(item) === -1 && typeof data[0][`${item}`] === 'number' && (
                                <MenuItem
                                  value={item}
                                  key={index}
                                  label={item}
                                >
                                  {item}
                                </MenuItem>
                              )
                            ))}

                          </Select>
                        </FormControl>
                        <FormControl>
                          <InputLabel htmlFor="statistic">Statistic</InputLabel>
                          <Select
                            value={this.state.stat}
                            onChange={this.setStat(data)}
                            inputProps={{ name: 'statistic', id: 'statistic' }}
                          >
                            <MenuItem value={'sum'}>Sum</MenuItem>
                            <MenuItem value={'mean'}>Mean</MenuItem>
                            <MenuItem value={'median'}>Median</MenuItem>
                            <MenuItem value={'min'}>Min</MenuItem>
                            <MenuItem value={'max'}>Max</MenuItem>
                          </Select>
                        </FormControl>
                      </form>

                      { this.state.data &&
                        <PieChart width={400} height={400}>
                          <Pie nameKey={this.state.groupBy} data={this.state.data} fill="#8884d8" label dataKey={this.state.dataKey} paddingAngle={2} innerRadius={40} outerRadius={80} />
                          <Tooltip />
                        </PieChart>
                      }

                    </div>
                  )}
                </Paper>
              </Zoom>
            </div>
          )
        }}
      </DataContext.Consumer>
    );
  }
}

export default withStyles(styles)(ChartContainer)