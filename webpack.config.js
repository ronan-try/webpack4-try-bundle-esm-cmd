const path = require('path');
const webpack = require('webpack');

// const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  devtool: 'none',
  // mode: 'production',
  mode: 'development',
  optimization: {
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      },
    },
    // minimizer: [new TerserPlugin()],
    // minimizer: [
    //   {
    //     options: {
    //       test: /\.m?js(\?.*)?$/i,
    //       chunkFilter: () => true,
    //       warningsFilter: () => true,
    //       extractComments: false,
    //       sourceMap: false,
    //       cache: true,
    //       cacheKeys: defaultCacheKeys => defaultCacheKeys,
    //       parallel: true,
    //       include: undefined,
    //       exclude: undefined,
    //       minify: undefined,
    //       terserOptions: {
    //         compress: {
    //           arrows: false,
    //           collapse_vars: false,
    //           comparisons: false,
    //           computed_props: false,
    //           hoist_funs: false,
    //           hoist_props: false,
    //           hoist_vars: false,
    //           inline: false,
    //           loops: false,
    //           negate_iife: false,
    //           properties: false,
    //           reduce_funcs: false,
    //           reduce_vars: false,
    //           switches: false,
    //           toplevel: false,
    //           typeofs: false,
    //           booleans: true,
    //           if_return: true,
    //           sequences: true,
    //           unused: true,
    //           conditionals: true,
    //           dead_code: true,
    //           evaluate: true
    //         },
    //         mangle: {
    //           safari10: true
    //         }
    //       }
    //     }
    //   }
    // ],
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader'
    }]
  },
  entry: {
    app: [
      './src/main.js'
    ],
    // other: [
    //   './src/other.js'
    // ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js'
  },
}