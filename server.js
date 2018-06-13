const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const bodyParser = require('body-parser');
const imageRouter = require('./src/ikaalinen/api/images/imageRouter.js');
const app = express();
const port = process.env.PORT || 3000;
const compiler = webpack(webpackConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(`${__dirname}/dist`));
app.use('/images', imageRouter)

//app.get('*', (req, res) => { res.send({message: 'This is not the base you are looking for.'}); });

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'main.js',
    publicPath: '/',
    stats: { colors: true },
    historyApiFallback: true
}));

const server = app.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Test app listening at https://${host}:${port}`);
});