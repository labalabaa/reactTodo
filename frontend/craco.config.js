module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      /* ... */
      webpackConfig.plugins[0].userOptions.scriptLoading = "blocking";
      webpackConfig.output = {
        ...webpackConfig.output,
        filename: "static/js/[name].[contenthash:10].js",
        chunkFilename: "static/js/[name].[contenthash:10].chunk.js",
      }
      return webpackConfig;
    },
  },
};
