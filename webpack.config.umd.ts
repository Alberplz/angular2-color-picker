const webpackAngularExternals = require('webpack-angular-externals');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

export default {
  entry: __dirname + '/src/index.ts',
  output: {
    path: __dirname + '/dist/umd',
    filename: 'narik-angular-color-picker.js',
    libraryTarget: 'umd',
    library: 'narikAngularColorPicker'
  },
  externals: [
    webpackAngularExternals()
  ],
  devtool: 'source-map',
  module: {
    rules: [
    
    // all css required in src/app files will be merged in js files
    { test: /\.(scss|sass)$/,  loader: 'raw-loader!postcss-loader!sass-loader' },
      {
      test: /\.ts$/,
      loaders: ['awesome-typescript-loader','angular2-template-loader'],
      exclude: /node_modules/
    },
    // support for .html as raw text
    // todo: change the loader to something that adds a hash to images
    { test: /\.html$/, loader: 'raw-loader' }]
  },
  resolve: {
    extensions: ['.ts', '.js','.scss']
  },
  plugins:[
    new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                mangle: {
                  keep_fnames: true ,
                    except: ['$super', '$', 'exports', 'require']
                }
            })]
 



};
