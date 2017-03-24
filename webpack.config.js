'use strict';

const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const isDev = !isProduction;
const libraryName = 'webgl-text';

module.exports = {
    target: 'web',
    debug: isDev,
    entry: {

        // Note: entry points must be in arrays to fix a strange bug with webpack
        // See: "A dependency to an entry point is not allowed"
        // https://github.com/webpack/webpack/issues/300
        index: ['./src/LibraryEntryPoint.ts']
    },
    context: __dirname,
    devtool: isProduction ? 'cheap-module-source-map' : 'inline-source-map',
    node: {
        __filename: true,
        __dirname: true
    },
    output: {
        publicPath: '/lib/',
        path: path.resolve('lib'),
        filename: '[name].js',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        modulesDirectories: [
            'node_modules',
            path.resolve(__dirname, './node_modules')
        ],
        extensions: ['', '.ts', '.js', '.frag', '.vert']
    },
    module: {
        loaders: [
            {
                test: /\.(frag|vert)$/,
                loader: 'raw'
            },
            {
                test: /\.ts$/,
                loaders: ['babel', 'awesome-typescript-loader'],
                exclude: /node_modules/,
                presets: ['react']
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                presets: ['react']
            }
        ]
    },
    plugins: combinePlugins(getPlugins(), isProduction && getProductionPlugins())
};

function combinePlugins(...plugins) {
    return _.compact(_.flatMap(plugins));
}

function getPlugins() {
  return [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': isProduction ? JSON.stringify('production') : JSON.stringify('dev'),
        PROJECT_ROOT: path.join('"', __dirname, '"'),
        'typeof window': JSON.stringify('object')
    })
  ];
}

function getProductionPlugins() {
    return [
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false,
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true
            },
            output: {
                comments: false
            },
            exclude: [/\.min\.js$/gi]
        })
      ];
  }
