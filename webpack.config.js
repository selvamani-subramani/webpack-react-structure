const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
let glob = require("glob");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let entry_files = {};

let all_jsx_files = glob.sync(path.join(__dirname, '/src/js/**/*.jsx'));
all_jsx_files.forEach(function (jsx) {
    let name = jsx.replace('.jsx', '.js');
    name = name.split('/src/js/')[1];
    name = 'js/' + name;

    let paths = name.split('/');
    let filename = paths[paths.length - 1];

    if (filename[0] !== "_") {  // Ignore files starting with underscore _
        entry_files[name] = jsx;
    }
});
console.log(all_jsx_files)
console.log(entry_files)


module.exports = {
  // entry: './src/index.js',
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'bundle.js'
  // },
  entry: entry_files,
  output: {
      path: path.join(__dirname, '/app/static/dist/'),
      filename: 'version-dev/[name]',
      publicPath: '/static/dist/',
  },
  optimization: {
      minimize: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
        resolve: {
          extensions: [".js", ".jsx"]
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
