const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  entry: [
    "babel-polyfill",
    "./demo/index",
  ],
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ProvidePlugin({
      tensuConfig: "tensuConfig",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      tensuConfig: path.join(path.resolve(), "taupahji.config.js"),
    },
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ["babel", "strict"],
      include: [
        path.join(__dirname, "demo"),
        path.join(__dirname, "src"),
      ],
    },
    {
      test: /\.css$/,
      loader: "style-loader!css-loader!postcss-loader",
    },
    {
      test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: "url-loader?limit=1",
    },
    {
      test: /\.json$/,
      loader: "json-loader",
    },
    {
      test: /\.html$/,
      loader: "html-loader",
    },
    ],
  },
};
