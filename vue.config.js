const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  /*
    如果您打算在子路径下部署站点，则需要设置publicPath
    例如GitHub Pages。 如果您打算将网站部署到https://foo.github.io/bar/
    然后publicPath应该设置为“ / bar /”
    在大多数情况下，请使用'/'！
    详细信息：https://cli.vuejs.org/config/#publicpath
  */
  publicPath: "./", // 静态资源访问
  outputDir: "dist", // 打包输出路径
  productionSourceMap: false, // 是否生成SourceMap文件定位错误（如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建）

  /* 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。
  允许对内部的 webpack 配置进行更细粒度的修改。 */
  chainWebpack: config => {
    // 配置别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"));

    config.optimization.minimizer("terser").tap(args => {
      // 去除生产环境console
      args[0].terserOptions.compress.drop_console = true;
      return args;
    });
  },
  devServer: {
    port: 8088, // 端口号
    open: "Google Chrome", // 配置自动启动浏览器  open: 'Google Chrome'-默认启动谷歌
    // 配置代理
    proxy: {
      "/": {
        target: "https://qzriverprotectapi.qzslsj.com:8443/wxriver"
        /* pathRewrite: {
          "^/api": ""
        } */
      }
    }
  }
};
