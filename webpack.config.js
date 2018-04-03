// Webpack 4 config

// https://github.com/webpack/webpack/releases/tag/v4.0.0-beta.0
// CLI has been move to webpack-cli, you need to install webpack-cli

// Fun with Webpack 4 upgrade
// https://gist.github.com/gricard/e8057f7de1029f9036a990af95c62ba8

// process.env.NODE_ENV are set to production or development (only in built code, not in config)
// FIX: Set NODE_ENV in the script too.
const debug = process.env.NODE_ENV !== 'production';

const Webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, './build');

// Use next version to be compatible with Webpack 4!
// 'extract-text-webpack-plugin': '^4.0.0-alpha.0'
// https://github.com/webpack-contrib/extract-text-webpack-plugin/tree/next
// https://github.com/webpack/webpack/blob/master/examples/code-splitted-css-bundle/README.md
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

let commonPlugins = [
  new ExtractTextPlugin({
    filename: 'css/styles.css',
    allChunks: true,
  }),
  // Pass __DEV__ to processed files
  // https://github.com/kriasoft/react-starter-kit/issues/1085
  new Webpack.DefinePlugin({
    __DEV__: debug,
  }),
  // Webpack dev server
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.template',
    inject: 'body'
  }),
]

module.exports = {
  context: __dirname,
  devtool: debug ? 'inline-sourcemap' : false,
  entry: {
    bundle: SRC_PATH + '/index',
  },
  output: {
    path: BUILD_PATH,
    publicPath: '',
    filename: 'js/[name].js',
    chunkFilename: '[name].bundle.js',
  },
  plugins: debug ? commonPlugins : [
    ...commonPlugins,
    // Add production plugins here!
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      // Load javascripts
      {
        test: /\.jsx?$/,
        include: SRC_PATH,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-0'],
        },
      },
      // Load stylesheets
      {
        test: /(\.css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      // Load images
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
      },
      // Load fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
      },
    ],
  },
  devServer: {
    historyApiFallback: true
  },
};
