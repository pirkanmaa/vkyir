import React, { Component } from 'react';
import { Colorscale } from 'react-colorscales';
import ColorscalePicker from 'react-colorscales';
import geostats from './geostats';

// Use "Viridis" as the default scale
const viridisColorscale = ['#fafa6e', '#9cdf7c', '#4abd8c', '#00968e', '#106e7c', '#2a4858'];

let a6 = [12, 22, 18, 5, 8, 43, 2, 34, 12, 34, 36, 4, 9, 35, 12, 42, 43, 56, 12, 23, 
    43, 19, 11, -1, 51, -6, 34, 33,41, 45, 23, -3, 3, 54, 1, 18, 44, 41,28, 16, 19, 
    35, 44, 21, 23, -3, 5, 64, 15, 17, 7, 93, 6, 16, 47, 13, 46, 53, 10, 30, 31, 32, 
    58, 28, 32, 46,53, 31, 2, 36, 41, 23, 3, 8, 15, 54, 35, 79, 15, 83, 6,-9, 78, 74, 
    56, 78, 45, 62, 19, 70, 23, 51, 73, 67, 78, 34, 52, 61, 60, 11, 26, 48, 15, 2];

let serie = new geostats();
serie.setSerie(a6);
console.log(serie.getClassQuantile(8));

/*export default class ColorControl extends Component {

    state = {
        colorscale: DEFAULT_SCALE,
        data: data
    };

    recolorData = (dataToRecolor, colorscale, plotType) => {
        let data = clone(dataToRecolor);
        const plotlyColorscale = colorscale.map((x, i) => { return [i / (colorscale.length - 1), x] });
        data[0].marker.colorscale = plotlyColorscale;
        return data;
    }

    onChange = colorscale => {

        const data = this.recolorData(this.state.data, colorscale);

        this.setState({
            data: data,
            colorscale: colorscale
        });
    }

    render() {
        return (
            <div>
                <ColorscalePicker
                    onChange={this.onChange}
                    colorscale={this.state.colorscale}
                    nSwatches={this.state.colorscale.length}
                />
                <div className='plotContainer'>
                    <Plot
                        data={this.state.data}
                        layout={this.state.layout}
                    />
                </div>
                <div className='textContainer'>
                    <p>
                        {JSON.stringify(this.state.colorscale)}
                    </p>
                </div>
            </div>
        );
    }
}*/