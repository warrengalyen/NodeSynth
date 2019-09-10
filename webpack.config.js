var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var isDev = process.argv.indexOf('-p') === -1;
var config = {
    context: path.resolve(__dirname + '/source'),
    entry: {
        main: './index.js'
    },
    output: {
        path: __dirname + '/deploy',
        filename: '[name]-[hash:6].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /(node_modules)/,
            query: {
                presets: ['es2015', 'stage-0']
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css')
        }]
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
};
if (isDev) {
    config.devtool = 'eval-source-map';
} else {
    config.plugins.push(
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new webpack.optimize.DedupePlugin()
    );
}
module.exports = config;