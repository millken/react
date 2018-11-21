const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const path = require('path');
const glob = require('glob-all');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'none',
    module: {
        rules: [{
            test: /(\.css|\.scss)$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options: { sourceMap: false },
                }, {
                    loader: 'sass-loader',
                    options: { sourceMap: false },
                }],
            }),
        }],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin({
            filename: (getPath) => getPath('css/[name]-[hash].css'),
            allChunks: true,
        }),
        new ManifestPlugin(),
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
                sourceMap: false,
                extractComments: true,
                uglifyOptions: {
                    warnings: false,
                    compress: true,
                  }
            }),
        ],
    },
});