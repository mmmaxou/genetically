const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'genetical.ts'),

  output: {
    filename: 'genetical.js',
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
    genetical: path.resolve(__dirname, 'src', 'genetical.ts'),
    'genetical.min': path.resolve(__dirname, 'src', 'genetical.ts'),
  };
  module.exports.output = {
    filename: '[name].js',
    path: path.resolve(__dirname, '_bundles'),
    libraryTarget: 'umd',
    library: 'genetical',
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
