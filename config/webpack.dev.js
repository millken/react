const webpack = require('webpack');
const path = require('path');

const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const apiMocker = require('webpack-api-mocker');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        contentBase: '../build',
        port: 3000,
        /*overlay: {
            errors: true,
            warnings: true,
        },*/
        before(app){
            apiMocker(app, path.resolve('./mocker/index.js'), {
                // proxy: {
                //     '/repos/*': 'https://api.github.com/',
                //     '/:owner/:repo/raw/:ref/*': 'http://127.0.0.1:2018',
                // },
                changeHost: true,
            });
        },
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: 'css-hot-loader',
            }].concat(ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options: { sourceMap: true },
                }, {
                    loader: 'sass-loader',
                    options: { sourceMap: true },
                }],
                // use style-loader in development
                fallback: 'style-loader',
            })),
        },{
            test: /.css$/,
            use: [{
                loader: 'css-hot-loader',
            }].concat(ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options: { sourceMap: true },
                }],
                // use style-loader in development
                fallback: 'style-loader',
            })),
        }
    ],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: (getPath) => getPath('css/[name].css'),
            allChunks: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
});