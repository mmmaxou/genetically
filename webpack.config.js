const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'genetical.ts'),

  output: {
    filename: 'genetical.js',
    path: path.resolve(__dirname, 'build', 'typescript'),
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: [/node_modules/],
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
    path: path.resolve(__dirname, 'build', 'browser'),
    libraryTarget: 'umd',
    globalObject: 'this',
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
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js/,
        sourceMap: true,
      }),
    ],
    usedExports: true,
    splitChunks: {
      minSize: 0,
    },
    concatenateModules: true,
  };
}
