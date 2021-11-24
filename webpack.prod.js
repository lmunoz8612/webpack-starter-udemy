const HtmlWebPackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin           = require('copy-webpack-plugin');
const CSSMinimizerPlugin   = require('css-minimizer-webpack-plugin');
const TerserPlugin         = require('terser-webpack-plugin');

module.exports = {
    mode   : 'production',
    output : {
        clean    : true,
        filename : 'main.[contenthash].js'
    },
    module : {
        rules : [
        {
            test    : /\.html$/i,
            loader  : 'html-loader',
            options : {
                sources  : false,
                minimize : false // true para Quitar comentarios, poner todo en una sola linea, etc.
            }
        },
        {
            test    : /\.css$/i,
            exclude : /styles.css$/,
            use     : ['style-loader', 'css-loader']
        },
        {
            test :  /styles.css$/i,
            use  : [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                },
            ],
        },
        {
            test    : /\.m?js$/,
            exclude : /node_modules/,
            use     : {
                loader  : "babel-loader",
                options : {
                    presets : ['@babel/preset-env']
                }
            }
        },
    ]},
    plugins : [
        new HtmlWebPackPlugin({
            title    : 'Mi Webpack App',
            template : './src/index.html',
            filename : './index.html'
        }),
        new MiniCssExtractPlugin({
            filename    : '[name].[fullhash].css', // Mismo nombre [name], id unico para no mantener cache de navegador [fullhash]
            ignoreOrder : false,
            linkType    : 'text/css',
        }),
        new CopyPlugin({
            patterns: [
                { from : 'src/assets/', to : 'assets/' },
            ],
        }),
    ],
    optimization : {
        minimize  : true,
        minimizer : [new CSSMinimizerPlugin(), new TerserPlugin()]
    }
}