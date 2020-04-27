const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const LIBRARY_NAME = 'genetical';
const OUTPUT_FOLDER = 'build';
const ENTRY_FOLDER = 'src';
const ENTRY_POINT = 'genetical.ts';

module.exports = [
  /**
   * Uncompressed output for browser
   */
  {
    entry: path.resolve(__dirname, ENTRY_FOLDER, ENTRY_POINT),

    output: {
      filename: LIBRARY_NAME + '.js',
      path: path.resolve(__dirname, OUTPUT_FOLDER, 'browser'),
      libraryTarget: 'umd',
      globalObject: 'this',
      library: LIBRARY_NAME,
      umdNamedDefine: true,
    },

    resolve: {
      extensions: ['.ts', '.json'],
    },

    devtool: 'none',

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/env',
                  {
                    targets: {
                      browsers: ['> 0.25%'],
                    },
                  },
                ],
                ['@babel/typescript'],
              ],
              plugins: [
                '@babel/proposal-numeric-separator',
                '@babel/proposal-class-properties',
                '@babel/proposal-object-rest-spread',
              ],
            },
          },
          exclude: [/test/, /node_modules/],
        },
      ],
    },

    plugins: [new ForkTsCheckerWebpackPlugin()],

    target: 'web',

    mode: 'production',

    optimization: {
      minimize: false,
    },
  },
  /**
   * Compressed output for browser
   */
  {
    entry: path.resolve(__dirname, ENTRY_FOLDER, ENTRY_POINT),

    output: {
      filename: LIBRARY_NAME + '.min.js',
      path: path.resolve(__dirname, OUTPUT_FOLDER, 'browser'),
      libraryTarget: 'umd',
      globalObject: 'this',
      library: LIBRARY_NAME,
      umdNamedDefine: true,
    },

    resolve: {
      extensions: ['.ts', '.json'],
    },

    devtool: 'none',

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/env',
                  {
                    targets: {
                      browsers: ['> 0.25%'],
                    },
                  },
                ],
                ['@babel/typescript'],
              ],
              plugins: [
                '@babel/proposal-numeric-separator',
                '@babel/proposal-class-properties',
                '@babel/proposal-object-rest-spread',
              ],
            },
          },
          exclude: [/test/, /node_modules/],
        },
      ],
    },

    plugins: [new ForkTsCheckerWebpackPlugin()],

    target: 'web',

    mode: 'production',

    optimization: {
      minimize: true,
    },
  },
  /**
   * Uncompressed output for node
   */
  {
    entry: path.resolve(__dirname, ENTRY_FOLDER, ENTRY_POINT),

    output: {
      filename: LIBRARY_NAME + '.js',
      path: path.resolve(__dirname, OUTPUT_FOLDER, 'node'),
      libraryTarget: 'umd',
      globalObject: 'this',
      library: LIBRARY_NAME,
      umdNamedDefine: true,
    },

    resolve: {
      extensions: ['.ts', '.json'],
    },

    devtool: 'none',

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/env',
                  {
                    targets: {
                      node: 10,
                    },
                  },
                ],
                ['@babel/typescript'],
              ],
              plugins: [
                '@babel/proposal-numeric-separator',
                '@babel/proposal-class-properties',
                '@babel/proposal-object-rest-spread',
              ],
            },
          },
          exclude: [/test/, /node_modules/],
        },
      ],
    },

    plugins: [new ForkTsCheckerWebpackPlugin()],

    target: 'node',

    mode: 'production',

    optimization: {
      minimize: false,
    },
  },
  /**
   * Compressed output for node
   */
  {
    entry: path.resolve(__dirname, ENTRY_FOLDER, ENTRY_POINT),

    output: {
      filename: LIBRARY_NAME + '.min.js',
      path: path.resolve(__dirname, OUTPUT_FOLDER, 'node'),
      libraryTarget: 'umd',
      globalObject: 'this',
      library: LIBRARY_NAME,
      umdNamedDefine: true,
    },

    resolve: {
      extensions: ['.ts', '.json'],
    },

    devtool: 'none',

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/env',
                  {
                    targets: {
                      node: 10,
                    },
                  },
                ],
                ['@babel/typescript'],
              ],
              plugins: [
                '@babel/proposal-numeric-separator',
                '@babel/proposal-class-properties',
                '@babel/proposal-object-rest-spread',
              ],
            },
          },
          exclude: [/test/, /node_modules/],
        },
      ],
    },

    plugins: [new ForkTsCheckerWebpackPlugin()],

    target: 'node',

    mode: 'production',

    optimization: {
      minimize: true,
    },
  },
];
