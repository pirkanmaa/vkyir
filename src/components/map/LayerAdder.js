import React, { Component } from 'react';

/* Material UI */
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import { FormControl, FormControlLabel, FormHelperText, FormGroup, FormLabel } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import Popover from 'material-ui/Popover';
import Switch from 'material-ui/Switch';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

/* XML to JSON data parser */
import fastXmlParser from 'fast-xml-parser';

/* OpenLayers */
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import GeoJSON from 'ol/format/geojson';
import loadingstrategy from 'ol/loadingstrategy';
import Style from 'ol/style/style';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
import Circle from 'ol/style/circle';

/* Chroma.js for color scale constructors, React-color for individual color picking */ 
import { SketchPicker } from 'react-color';
import chroma from 'chroma-js';

/* Functions for statistical classifications */
import { ckmeans, equalIntervalBreaks, quantile, numericSort } from 'simple-statistics'

/* Utility functions */
import _createStyle from './utils/_createStyle';
// import _getCapabilities from './utils/_getCapabilities';
// import _getLayer from './utils/_getLayer';

/* Material UI styles */
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 200
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    textField: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    chip: {
        margin: theme.spacing.unit,
    }
});

/* Dialog component for fetching, styling and adding map layers */
class LayerAdder extends Component {

    state = {
        stroke: true,
        fill: true,
        SSFopen: false,
        SSSopen: false,
        loading: false,
        activeStep: 0,
        service: 'WFS',
        url: 'https://www.ubigu.fi/geoserver/ubigu/wfs?service=WFS&request=GetCapabilities',
        layerName: '',
        style: {
            type: 'single',
            featureType: '',
            fill: '#000000',
            scale: 'Greens',
            method: 'equalIntervalBreaks',
            stroke: '#FFFFFF',
            strokeWidth: 0.5,
            radius: 5,
            numClasses: 5,
            fieldSelection: '',
            fieldValues: []
        },
        data: null
    };

    scales = ['Viridis', 'Greens', 'Blues', 'Greys', 'Oranges', 'Purples', 'Reds', 'BuGn', 'BuPu', 'GnBu', 'OrRd', 'PuBu', 'PuBuGn', 'PuRd', 'RdPu', 'YlGn', 'YlGnBu', 'YlOrBr', 'YlOrRd', 'BrBG', 'PiYG', 'PRGn', 'PuOr', 'RdBu', 'RdGy', 'RdYlBu', 'RdYlGn', 'Spectral'];

    anchorEl = null;

    /* Handle clicking stepper forwards */
    handleNext = () => {
        switch (this.state.activeStep) {
            case 0: this._getCapabilities(); this.setState({ activeStep: this.state.activeStep + 1 }); break;
            case 1: this._getLayer(); this.setState({ activeStep: this.state.activeStep + 1 }); break;
            case 2: this._createLayer(); this.setState({ activeStep: 0 }); this.props.closeLayerAdder(); break;
            default: return null;
        }
    };
    
    /* Handle clicking stepper backwards */
    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 });
    }

    changeValue = name => event => {
        this.setState({ [name]: event.target.value });
    }

    toggler = name => event => {
        this.setState({ [name]: !this.state[`${name}`] });
    }

    changeStyle = name => event => {
        let style = Object.assign({}, this.state.style);
        style[`${name}`] = event.target.value;
        this.setState({ style });
    }

    changeSingleColor = name => color => {
        let style = Object.assign({}, this.state.style);
        style[`${name}`] = color.hex;
        this.setState({ style });
    }

    changeColorScale = event => {
        let style = Object.assign({}, this.state.style);
        style['scale'] = event.target.value;
        style['fill'] = chroma.scale(event.target.value).colors(this.state.style.numClasses);
        this.setState({ style });
    }

    _setUniques = name => event => {

        let fieldSelection = event.target.value;
        let allValues = this.state.data.map(feat => feat[fieldSelection]);
        let uniqueValues = [...new Set(allValues)];

        let style = Object.assign({}, this.state.style);
        style['fieldSelection'] = fieldSelection;
        style['fieldValues'] = uniqueValues;
        style['numClasses'] = uniqueValues.length;
        this.setState({ style });
    }

    _setBreaks = name => event => {

        let fieldSelection = event.target.value;
        let allValuesTemp = this.state.data.map(feat => feat[fieldSelection]);
        let allValues = allValuesTemp.filter(value => typeof value === 'number');

        /* general function for generating class boundary values */
        const breaks = (values, n) => {
            switch (this.state.style.method) {
                case 'ckmeans':
                    /* ckmeans returns an array of arrays with similar values - break it down to [{lowerBound: 1, upperBound: 2}, {...}] */
                    return ckmeans(values, n).map(value => {
                        return {
                            lowerBound: value[0],
                            upperBound: value[value.length - 1]
                        }
                    });
                    break;
                case 'equalIntervalBreaks':
                    /* equalIntervalBreaks returns an class breaks with length n+1, breaks can be arbitrary numbers. Need to figure closest numbers. */
                    let temp2 = numericSort(values);
                    let temp3 = equalIntervalBreaks(values, n);
                    return temp3.map((value, index) => {
                        return {
                            lowerBound: index === 0 ? value : temp2.find(val => val >= value),
                            upperBound: index === temp3.length - 1 ? value : temp2.reverse().find(val => val <= temp2[index + 1])
                        }
                    });
                    break;
            }
        };

        let style = Object.assign({}, this.state.style);
        style['fieldSelection'] = fieldSelection;
        style['fieldValues'] = breaks(allValues, this.state.style.numClasses);
        this.setState({ style });
    }

    _getCapabilities = () => {
        this.setState({ loading: true });
        fetch(this.state.url).then(response => response.text()
        ).then(xml => {
            this.setState({ loading: false });
            let result = fastXmlParser.parse(xml);
            this.setState({ availableLayers: result[Object.keys(result)[0]].FeatureTypeList.FeatureType });
            this.setState({ layerName: this.state.availableLayers[0].Name });
        }).catch(error => console.error('Error:', error));
    }

    _getLayer = () => {
        const url = this.state.url.replace('GetCapabilities', `GetFeature&typeName=${this.state.layerName}&srsName=EPSG:3857&outputFormat=json`);
        this.setState({ loading: true });
        fetch(url).then(response => response.json()
        ).then(json => {

            /* Transform data into an object of key: array pairs with all values
            
            let data = json.features.reduce((data, feat) => {
                Object.keys(feat.properties).forEach(key => {
                    return data[key] = !data[key] ? [feat.properties[key]] : [...data[key], feat.properties[key]];
                })
                return data;
            }, {});

            */

            let data = json.features.map(feature => feature.properties);
            this.setState({ data });
            this.props.setData(data);
            this.setState({ loading: false });
            this.setState({ featureType: json.features[0].geometry.type });
        }).catch(error => console.error('Error:', error));
    }

    _getStyler = () => {
        switch (this.state.style.type) {
            case 'single':
                return <div>
                    {['fill', 'stroke'].map(item => {
                        return <div key={item}>
                            <Button
                                buttonRef={node => { this.anchorEl = node; }}
                                variant="raised"
                                size="small"
                                style={{ background: `${this.state.style[`${item}`]}`, color: this.state.style[`${item}`] < '#888888' ? 'white' : 'black' }}
                                onClick={item === 'fill' ? this.toggler('SSFopen') : this.toggler('SSSopen')}
                            >{item}</Button>
                            <Checkbox
                                checked={this.state[`${item}`]}
                                onChange={this.toggler(item)}
                                value={item}
                                color="primary"
                            />
                        </div>
                    })}
                    <div>
                        <FormControl>
                            <InputLabel htmlFor="strokeWidth">Stroke width</InputLabel>
                            <Select
                                value={this.state.style.strokeWidth}
                                onChange={this.changeStyle('strokeWidth')}
                                inputProps={{ name: 'strokeWidth', id: 'strokeWidth' }}
                            >
                                {[0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5].map((width, index) => {
                                    return <MenuItem key={index} value={width}>{width}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        {(this.state.featureType === 'MultiPoint' || this.state.featureType === 'Point') &&
                            <FormControl>
                                <InputLabel htmlFor="radius">Marker size</InputLabel>
                                <Select
                                    value={this.state.style.radius}
                                    onChange={this.changeStyle('radius')}
                                    inputProps={{ name: 'radius', id: 'radius' }}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((radius, index) => {
                                        return <MenuItem key={index} value={radius}>{radius}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        }
                    </div>
                    {['fill', 'stroke'].map(item => {
                        return <Popover
                            key={item}
                            anchorEl={this.anchorEl}
                            open={item === 'fill' ? this.state.SSFopen : this.state.SSSopen}
                            onClose={item === 'fill' ? this.toggler('SSFopen') : this.toggler('SSSopen')}
                            anchorOrigin={{ vertical: 'bottom' }}
                        >
                            <SketchPicker
                                color={this.state.style[`${item}`]}
                                onChangeComplete={this.changeSingleColor(item)}
                            />
                        </Popover>
                    })}
                </div>;
                break;
            case 'categorical':
                return <div>
                    <FormControl>
                        <InputLabel htmlFor="fieldSelection">Select field</InputLabel>
                        <Select
                            value={this.state.style.fieldSelection}
                            onChange={this._setUniques('fieldSelection')}
                            inputProps={{ name: 'fieldSelection', id: 'fieldSelection' }}
                        >
                            {Object.keys(this.state.data[0]).map((item, index) => (
                                <MenuItem
                                    value={item}
                                    key={index}
                                    label={item}
                                >
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="colorScale">Choose colorscale</InputLabel>
                        <Select
                            value={this.state.style.scale}
                            onChange={this.changeColorScale}
                            inputProps={{ name: 'colorScale', id: 'colorScale' }}
                        >
                            {this.scales.map((scale, index) => {
                                return <MenuItem key={index} value={scale}>{scale}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>;
                break;
            case 'quantitative':
                return <div>
                    <FormControl>
                        <InputLabel htmlFor="numClasses">Number of classes</InputLabel>
                        <Select
                            value={this.state.style.numClasses}
                            onChange={this.changeStyle('numClasses')}
                            inputProps={{ name: 'numClasses', id: 'numClasses' }}
                        >
                            {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((classnum, index) => {
                                return <MenuItem key={index} value={classnum}>{classnum}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="method">Classification method</InputLabel>
                        <Select
                            inputProps={{ name: 'method', id: 'method' }}
                            value={this.state.style.method}
                            onChange={this.changeStyle('method')}
                        >
                            <MenuItem value={'equalIntervalBreaks'}>Equal intervals</MenuItem>
                            <MenuItem value={'ckmeans'}>Natural breaks</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="colorScale">Choose colorscale</InputLabel>
                        <Select
                            value={this.state.style.scale}
                            onChange={this.changeColorScale}
                            inputProps={{ name: 'colorScale', id: 'colorScale' }}
                        >
                            {this.scales.map((scale, index) => {
                                return <MenuItem key={index} value={scale}>{scale}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="fieldSelection">Select field</InputLabel>
                        <Select
                            value={this.state.style.fieldSelection}
                            onChange={this._setBreaks('fieldSelection')}
                            inputProps={{ name: 'fieldSelection', id: 'fieldSelection' }}
                        >
                            {Object.keys(this.state.data[0]).map((item, index) => (
                                typeof this.state.data[0][`${item}`] === 'number' && (
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
                </div>;
                break;
            default: return null;
        }
    }

    _createLayer = () => {

        const layer = new VectorLayer({
            source: new VectorSource({
                url: this.state.url.replace('GetCapabilities', `GetFeature&typeName=${this.state.layerName}&srsName=EPSG:3857&outputFormat=json`),
                strategy: loadingstrategy.all,
                format: new GeoJSON()
            }),
            style: _createStyle(this.state.style),
            title: 'testLayer',
            name: 'testLayer',
            visible: true
        });

        this.props.map.addLayer(layer);

    }

    render() {

        const { classes } = this.props;
        const { activeStep } = this.state;

        return (
            <div>
                <Dialog
                    className={classes.root}
                    open={this.props.showLayerAdder}
                    onClose={this.props.closeLayerAdder}
                    aria-labelledby="layer-dialog-title"
                >
                    <DialogTitle id="layer-dialog-title">Add map layer</DialogTitle>
                    <DialogContent>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            <Step key='service'>
                                <StepLabel>Select service</StepLabel>
                                <StepContent>
                                    <form autoComplete="off">
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="service">Service type</InputLabel>
                                            <Select
                                                inputProps={{ name: 'service', id: 'service' }}
                                                value={this.state.service}
                                                onChange={this.changeValue('service')}
                                            >
                                                {['WFS', 'WMS', 'MVT'].map((ogc, index) => {
                                                    return <MenuItem key={index} value={ogc}>{ogc}</MenuItem>
                                                })}
                                            </Select>
                                            <TextField
                                                inputProps={{ name: 'url', id: 'url' }}
                                                label="GetCapabilities URL"
                                                defaultValue={this.state.url}
                                                onChange={this.changeValue('url')}
                                            />
                                        </FormControl>
                                    </form>
                                </StepContent>
                            </Step>
                            <Step key='layer'>
                                <StepLabel>Select layer</StepLabel>
                                <StepContent>
                                    {this.state.loading ? <CircularProgress /> :
                                        <form autoComplete="off">
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="layerName">Select layer</InputLabel>
                                                {this.state.availableLayers && this.state.layerName && (
                                                    <Select
                                                        value={this.state.layerName}
                                                        onChange={this.changeValue('layerName')}
                                                        inputProps={{ name: 'layerName', id: 'layerName' }}
                                                    >
                                                        {this.state.availableLayers.map((item, index) => (
                                                            <MenuItem
                                                                value={item.Name}
                                                                key={index}
                                                                label={item.Title}
                                                            >
                                                                {item.Title}
                                                            </MenuItem>
                                                        ))}

                                                    </Select>
                                                )}
                                            </FormControl>
                                        </form>
                                    }
                                </StepContent>
                            </Step>
                            <Step key='type'>
                                <StepLabel>Select styling</StepLabel>
                                <StepContent>
                                    {this.state.loading ? <CircularProgress /> :
                                        <form autoComplete="off">
                                            <FormControl className={classes.formControl}>
                                                {this.state.layerName && (
                                                    <div>
                                                        <InputLabel htmlFor="type">Select styling</InputLabel>
                                                        <Select
                                                            value={this.state.style.type}
                                                            onChange={this.changeStyle('type')}
                                                            inputProps={{ name: 'type', id: 'type' }}
                                                        >
                                                            <MenuItem value={'single'}>Single symbol</MenuItem>
                                                            <MenuItem value={'categorical'}>Categorical</MenuItem>
                                                            <MenuItem value={'quantitative'}>Quantitative</MenuItem>
                                                        </Select>
                                                        <Divider />
                                                        {this._getStyler()}
                                                    </div>
                                                )}
                                            </FormControl>
                                        </form>
                                    }
                                </StepContent>
                            </Step>
                        </Stepper>
                    </DialogContent>
                    <DialogActions>

                        <Button disabled={activeStep === 0} onClick={this.handleBack}>Back</Button>
                        <Button variant="raised" color="primary" onClick={this.handleNext}>{activeStep === 2 ? 'Finish' : 'Next'}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(LayerAdder);