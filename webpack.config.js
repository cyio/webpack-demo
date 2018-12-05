const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
    new BundleAnalyzerPlugin()
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
  }
};
