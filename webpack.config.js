
/**
 * Created by daishun on 2016/9/18.
 */
var path=require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack=require('webpack');
var _=require('lodash');
var faker=require('faker');
module.exports={
    externals: {
        'react': 'React',
        'react-dom':'ReactDOM',
        'antd':'antd',
        'react-router':'ReactRouter',
        'react-redux':'ReactRedux',
        'redux':'Redux',
        'redux-thunk':'ReduxThunk',
        'jquery':'$openjQuery',
        'pubsub':'PubSub',
        '$open':'$open'
    },
    resolve:{
        extensions:['','.js','.jsx']
    },
    entry:{
        App:"./src/components/App.jsx"
    },
    output:{
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        library: ["$open", "[name]"],
        libraryTarget: "umd",
        umdNamedDefine:'true'
    },
    module:{
        loaders:[
            {
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loaders: [
                    'style?sourceMap',
                    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new webpack.optimize.UglifyJsPlugin({//压缩代码
            compress: {
                warnings: false
            }
        })
    ],
    devServer:{
        inline:true,
        port:3000,
        // proxy: {
        //     '/admin/*': {
        //         // target: 'http://openqa.zhaopin.com/app',
        //         target:"http://127.0.0.1:8081",
        //         secure: false,
        //         changeOrigin:true
        //     }
        // },
        setup: function(app) {
            // Here you can access the Express app object and add your own custom middleware to it.
            // For example, to define custom handlers for some paths:
            // app.get('/some/path', function(req, res) {
            //   res.json({ custom: 'response' });
            // });
            app.get("/admin/product/list.do",function (req,res) {
                res.json({
                    data:{
                        total:100,
                        data:_.times(10,function () {
                            return {
                                "productId": faker.random.number(),
                                "showName": faker.name.title(),
                                "urlPath":faker.internet.url(),
                                "productDesc": faker.random.number()
                            }
                        })
                    }
                });
            })

        },
    }
}