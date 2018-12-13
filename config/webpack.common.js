const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: resolve(__dirname, '..', 'src'),
    entry: {
        main: './index.js',
    },
    output: {
        path: resolve(__dirname,'..', 'build'),
        filename: '[name]-bundle.js',
        chunkFilename: '[name]-chunk.js',
    },
    module: {
        rules: [{
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                interpolate: true,
            },
        }, {
            test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
            // exclude: /node_modules/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                publicPath: '../assets/fonts/',
                outputPath: 'assets/fonts/',
            },
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                publicPath: '../assets/images/',
                outputPath: 'assets/images/',
            },
        }, {
            test: /\.(js|jsx)$/,
            exclude:/node_modules/,
            use: ['babel-loader', 'eslint-loader'],
        },{
            test: /\.svg$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: '/assets/images/',
                        outputPath: 'assets/images/',
                    },                    
                },
            ],
        },
        ],
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, '..', 'src/'),
        },
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '../public/index.html',
        }),
        new webpack.ProvidePlugin({
            React: 'react', //Global access
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ],
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
};