const path = require('path');
const webpack = require('webpack');

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
                query: require('./babelrc.js'), //this is added since we changed the filename
            }
        ],
    }
};

const serverConfig = {
    target: 'node',

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
                query: require('./babelrc.js'), //this is added since we changed the filename
            }
        ],
    }
};

// Notice that both configurations are exported
module.exports = [clientConfig, serverConfig];