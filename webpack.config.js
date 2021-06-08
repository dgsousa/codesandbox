const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.jsx'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contentHash].js',
        publicPath: '/'
    },
    
    mode: 'development',

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
                resolve: {
                    extensions: ['.js', '.jsx']
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.[contentHash].css'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.DefinePlugin({
            'process.env.SCALE_MEDIUM': 'true',
            'process.env.SCALE_LARGE': 'false',
            'process.env.THEME_LIGHT': 'true',
            'process.env.THEME_LIGHTEST': 'false',
            'process.env.THEME_DARK': 'false',
            'process.env.THEME_DARKEST': 'true',
        }),
    ],

    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        port: 8000
    }
}