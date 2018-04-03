const path = require('path');

module.exports = {
    entry: ['./src/main.js'],
    output: {
        path: path.join(__dirname, 'www'),
        publicPath: '/',
        filename: 'bundle.js' // filename: '[name].[hash].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }]
    }
};