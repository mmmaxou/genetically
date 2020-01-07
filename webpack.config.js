const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src'),

  output: {
    filename: 'genetica.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [new ForkTsCheckerWebpackPlugin()],
};

if (process.env.NODE_ENV === 'production') {
  module.exports.entry = {
    genetica: path.resolve(__dirname, 'src'),
    'genetica.min': path.resolve(__dirname, 'src'),
  };
  module.exports.output = {
    filename: '[name].js',
    path: path.resolve(__dirname, '_bundles'),
    libraryTarget: 'umd',
    library: 'genetica',
    umdNamedDefine: true,
  };
  module.exports.module.rules[0].exclude = [
    /test/,
    /index\.ts$/,
    /node_modules/,
  ];
  module.exports.optimization = {
    minimize: true,
    usedExports: true,
    splitChunks: {
      minSize: 0,
    },
    concatenateModules: true,
  };
}
