import path from 'path';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default merge(common, {
  mode: 'production',
  entry: {
    main: './src/index.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
  ],
});
