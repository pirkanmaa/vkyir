const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Data2Go development version',
            template: './template.html',
            filename: './index.html'
        })
    ]
});