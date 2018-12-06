const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin'); //引入清除文件插件

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    b: './src/b.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.npm_config_report ? 'server' : 'disabled'
    }),
    new CleanWebpackPlugin(['dist']),//实例化，参数为目录
  ],
  optimization: {
    splitChunks: {
      // chunks: 'all'
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          minChunks: 2,
          minSize: 0, // 默认 30kb，才会优化提取，cacheGroups 里的规则会继承
          name: 'vendors', // 默认文件名 vendors~b~index.bundle.js
        },
      }
    }
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
            },
          },
        ]
      },
    ]
  },
};
