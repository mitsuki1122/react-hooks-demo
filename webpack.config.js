const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Apis = require('./mock/index.ts');

module.exports = {
  //入口
  entry: './src/app.js',
  // entry: './src/main.js',
  // './src/mainAtd.js',

  // entry:'./src/entry-library.js',
  // 出口
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    // library: 'result'
  },
  devtool: 'source-map',
  // 模块解析
  module: {
    rules: [
      {
        test: /(\.js|\.jsx|\.ts|\.tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [require.resolve('react-refresh/babel')],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // modules: true
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /src/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // modules: true
            },
          },
        ],
      },

      {
        test: /\.less$/,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // module: true,
              modules: { localIdentName: '[local]___[hash:base64:5]' },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {},
            },
          },
        ],
      },
      {
        test: /\.less$/,
        include: [/node_modules/],
        use: [
          'style-loader',
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#1DA57A',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      '@/components': path.resolve(__dirname, './src/components'),
    },
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
    historyApiFallback: true,
    onBeforeSetupMiddleware: (devServer) => {
      devServer.app.get('/api/*', (request, response) => {
        console.log('path', request.path);
        response.send(Apis[request.path]);
        // response.json(Apis[request.path]);
      });
    },
  },
  optimization: {
    // 1. 这个配置必须
    minimize: false,
  },
  // devtool: "source-map" ,
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html', // html模板
    }),
    new webpack.DefinePlugin({
      APP_TYPE: "'APPTest'",
    }),
  ],
};
