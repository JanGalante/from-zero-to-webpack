const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const createBabelConfig = require('./babelrc');

const PRODUCTION = process.env.NODE_ENV === 'production';
const MinifierPlugin = require('babili-webpack-plugin');

const clientConfig = {
    entry: path.resolve('./src/index.browser.js'),
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', include: path.resolve('./src'), query: createBabelConfig() }, 
            // { test: /\.css$/, loader: 'css-loader', /*include: path.resolve('./assets'),*/ query: createBabelConfig() }
        ],
    },
    plugins: [
        PRODUCTION && new MinifierPlugin(),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }) //minify NODE_ENV constants
    ].filter(e => e),
    devtool: PRODUCTION ? 'source-map' : 'cheap-module-eval-source-map',
};

const serverConfig = {
    target: 'node',
    externals: [nodeExternals({
        whitelist: PRODUCTION ? ['react', 'react-dom/server'] : [] // those are specified in node_modules, but we want webpack to minify them
    })], //Exclude node_modules from bundle

    node: {
        __dirname: true //true: sets _dirname to what it was in the source file. ./src/ in our case.
    },

    entry: path.resolve('./src/index.server.js'),
    output: {
        path: path.resolve('./dist'),
        filename: 'server.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve('./src'),
                loader: 'babel-loader',
                query: createBabelConfig({ server: true }), //telling babel to setup for a node server
            }
        ],
    },
    plugins: [
        PRODUCTION && new MinifierPlugin(),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }), //minify NODE_ENV constants
        new webpack.BannerPlugin({ // plugin that insert code at the top of all the output files
            banner: 'require("source-map-support").install();', //needed to run the source map plugin for server
            raw: true,
            entryOnly: false,
        }),
    ].filter(e => e),
    devtool: 'source-map',
};

// Notice that both configurations are exported
module.exports = [clientConfig, serverConfig];