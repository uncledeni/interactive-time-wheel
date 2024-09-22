const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// const webpack = require('webpack');

module.exports = {
    mode: "development",

    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, './dist')
        },
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },

    entry: {
        main: path.resolve(__dirname, './src/index.jsx')
    },

    output: {
        path: path.resolve(__dirname, '/dist'),
        filename: '[name].[hash].js'
    },

    plugins: [
        new HTMLWebpackPlugin({ template: "./src/index.html" }),
        new CleanWebpackPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // Сообщаем вебпаку, что для работы с js-, jsx-файлами
                // следует использовать babel-loader
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                // Сообщаем вебпаку, что для работы с js-, jsx-файлами
                // следует использовать babel-loader
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|svg)/,
                use: ['file-loader']
            }
        ],
    },

}