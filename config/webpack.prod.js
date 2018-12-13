const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const path = require('path');
const glob = require('glob-all');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
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
        }],
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new ExtractTextPlugin({
            filename: (getPath) => getPath('assets/[name]-[hash].css'),
            allChunks: true,
        }),
        new PurifyCSSPlugin({
            paths: glob.sync([
                path.join(__dirname, 'src/*.html'),
                path.join(__dirname, 'src/view/components/*/*.js'),
                path.join(__dirname, 'src/view/pages/*.js'),
            ]),
            minimize: true,
            purifyOptions: {
                whitelist: [],
            },
        }),

    ],
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),
        ],
    },
});