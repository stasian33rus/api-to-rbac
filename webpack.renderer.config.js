const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");

module.exports = {
  module: {
    rules: [
      ...rules,
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
};
