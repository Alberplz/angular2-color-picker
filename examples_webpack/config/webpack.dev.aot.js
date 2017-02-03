var path = require('path');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var ngtools = require('@ngtools/webpack');

module.exports = webpackMerge(commonConfig, {
    entry: {
        'polyfills': './src/polyfills.ts',
        'app': './src/main.ts'
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: helpers.root('dist'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        sourceMapFilename: '[name].css.map'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['@ngtools/webpack']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),

        new ngtools.AotPlugin({
          tsConfigPath: path.join(__dirname, '../tsconfig.json'),
          entryModule: path.join(__dirname, '../src/app/app.module#AppModule')
        })
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
