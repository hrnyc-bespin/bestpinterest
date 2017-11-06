const path = require('path');
const SRC = path.join(__dirname, '/client');
const DIST = path.join(__dirname, '/server/dist');

module.exports = {
  entry: `${SRC}/app.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
};