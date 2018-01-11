const path = require('path');

//Simplifies creation of HTML files to serve webpack bundles
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/'),

};

module.exports = {
    entry: path.join(paths.JS, 'index.js'),
    output:{
        path: paths.DIST,
        filename: 'app.bundle.js'
    },
    //tell webpack to use html plugin
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC, 'index.html'),
        }),
        new ExtractTextPlugin('style.bundle.css'),
    ],
    //tell webpack to use "babel-loader" for .js and .jsx files
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
            //css loader -> then to text extraction that writes to the file
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader',
                }),
            },
            //File loader for images -> you can also add svgs, fonts, and vids
            {
                test: /\.(png|jpg|gif)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ],
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },
};