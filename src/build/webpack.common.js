import path from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default {
  name: 'c3po',
  output: {
    path: path.resolve(__dirname, '../../dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },

      { test: /\.m?js/, type: 'javascript/auto' },

      {
        test: /\.?js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env'], ['@babel/preset-react']],
          //   plugins: [['@babel/plugin-transform-runtime', { regenerator: true }]],
        },
      },

      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|mp3)/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  resolve: {
    // extensions: ['js', 'ts'],
    alias: {
      // '@': path.resolve(__dirname, './src'),
      '@images': path.resolve(__dirname, '../../images/'),
      '@sounds': path.resolve(__dirname, '../../sounds/'),
      '@fonts': path.resolve(__dirname, '../../fonts/'),
    },
  },
};
