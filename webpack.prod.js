const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: (() => {
        // overload -p flag in $ webpack -p
        // for more info on $ webpack -p see: https://webpack.github.io/docs/cli.html#production-shortcut-p
        if (process.argv.indexOf('-p') !== -1) {
            return [
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify('production'),
                    },
                }),

                // note that webpack's -p shortcut runs the UglifyJsPlugin (https://github.com/webpack/docs/wiki/optimization)
                // but for some reason leaves in one multiline comment while removing the rest,
                // so have to set comments: false here to remove all the comments
                new webpack.optimize.UglifyJsPlugin({
                    sourceMap: true,
                    uglifyOptions: {
                        ecma: 6
                    },
                    output: {
                        comments: false,
                    }
                }),
            ];
        } return [];
    })()
});