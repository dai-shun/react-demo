
/**
 * Created by daishun on 2016/9/18.
 */
var path=require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    resolve:{
        extensions:['','.js','.jsx']
    },
    entry:{
        index:"./src/HelloWorld/main.jsx"
    },
    output:{
        path: path.join(__dirname, "dist"),
        filename: "[name].js"
    },
    devServer:{
        inline:true,
        port:3000
    },
    module:{
        loaders:[
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}