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
            {
                test: /\.js$/,
                include: path.resolve('./src'),
                loader: 'babel-loader',
                query: createBabelConfig(),
            }
        ],
    },
    plugins: [
        PRODUCTION && new MinifierPlugin(),
    ].filter(e => e),
};

const serverConfig = {
    target: 'node',
    externals: [nodeExternals()], //Exclede node_modules from bundle

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
    ].filter(e => e),
};

// Notice that both configurations are exported
module.exports = [clientConfig, serverConfig];