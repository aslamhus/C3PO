import path from 'path';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default merge(common, {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
  ],
  devServer: {
    devMiddleware: {
      publicPath: 'auto',
    },
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    open: ['/index.html'],
    compress: true,
    hot: true,
    port: 9000,
    //   https: {
    //     passphrase: 'webpack-dev-server',
    //   },
  },
});
