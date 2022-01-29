module.exports = {
  /**
   * Important!
   * For using electron api in render, need use preload file.
   * and since we have several entries, we need to correct the output section as well.
   * It's not specified in the default config,
   * so the webpack generates for each entry a gang named index.js.
   * And it turns out that if you have several entries for each of them,
   * an index.js file is generated.
   * Therefore, we specify filename: '[name] .js? Hash = [contenthash]'
   * so that the bundle name for each entry matches the entry name
   */
  entry: {
    main: "./src/main.ts",
    preload: "./src/preload.ts",
  },
  output: {
    filename: "[name].js?hash=[contenthash]",
    clean: true,
  },
  module: {
    rules: require("./webpack.rules"),
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
