import path from 'path';
import { fileURLToPath } from 'url';
import nodeExternals from 'webpack-node-externals';

const filename = fileURLToPath(import.meta.url);

export default {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(path.dirname(filename), 'dist'),
    filename: 'main.cjs'
  },
  target: 'node',
  externals: [nodeExternals()]
};