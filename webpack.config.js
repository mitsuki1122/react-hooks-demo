const  path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //入口
  entry:'./src/main.js',
  // entry:'./src/entry-library.js',
  // 出口
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    // library: 'result'
  },
  // 模块解析
  module: {
    rules: [{
        test: /(\.js|\.jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [require.resolve('react-refresh/babel')]
          }
        }
      }, {
        test: /\.css$/,
        use: ['style-loader','css-loader'],
    }
    ]
  },
  resolve: {
    // extensions: ['.js'],
  },
  devServer: {
    // contentBase: path.resolve(__dirname, "./static/"),
    //compress: true,
    port: 9000,
    // devMiddleware: {writeToDisk: true}, // 内存内容写入磁盘
    // watchOptions: {
    //   ignored: /node_modules/, // 监听过多文件会占用cpu、内存，so，可以忽略掉部分文件
    //   aggregateTimeout: 200, // 默认200，文件变更后延时多久rebuild
    //   poll: false, // 默认false，如果不采用watch，那么可以采用poll（轮询）
    // },
  },
  optimization: {    // 1. 这个配置必须
    minimize: false
  },
  devtool: "source-map" ,
  // 插件
  plugins:[
    // new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
        template: 'index.html', // html模板
    })
  ]
}
