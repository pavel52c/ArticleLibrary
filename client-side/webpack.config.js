const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "./src/index.tsx"),
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.bundle.js",
    clean: true,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "_dist"),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      { test: /\.svg$/, use: ["svg-inline-loader"] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Скармливаем наш HTML-темплейт
    }),
  ],
  performance: {
    maxEntrypointSize: 51200000000,
    maxAssetSize: 512000000,
  },
};
