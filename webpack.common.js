const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: resolve(__dirname, 'src'),
    entry: {
        main: './index.js',
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'js/[name]-bundle.js',
        chunkFilename: 'js/[name]-chunk.js',
    },
    module: {
        rules: [{
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                interpolate: true,
            },
        }, {
            test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            exclude: /node_modules/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                publicPath: '../fonts/',
                outputPath: 'fonts/',
            },
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                publicPath: '../images/',
                outputPath: 'images/',
            },
        }, {
            test: /\.js$/,
            include: resolve(__dirname, 'src/'),
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env'],
                    plugins: [
                        ['transform-react-jsx', {
                            'pragma': 'React.createElement',
                        }],
                    ],
                },
            }],
        }],
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src/'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '../public/index.html',
            favicon: '../public/favicon.png'
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