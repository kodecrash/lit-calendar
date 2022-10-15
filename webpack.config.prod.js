const path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
process.env.NODE_ENV = 'production';



module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.json"
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/dist")
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public/dist"),
    compress: true,
    port: 8080
  },
  plugins: [
    new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false
          }
        }
    }),
    new HtmlWebpackPlugin({
      title: "Lit-Element Template",
      filename: "index.html",
      template: "public/index.html",
      alwaysWriteToDisk: true,
      minify: false
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve(__dirname, "public/dist")
    }),
    new CompressionPlugin()
  ],
  devtool: false
};
