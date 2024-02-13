const path = require("path");

module.exports = {
  devtool: 'source-map' ,
  mode: "development",
  entry: "./inject.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
};
