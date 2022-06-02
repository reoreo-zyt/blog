const port = 5301
module.exports = {
  transpileDependencies: true,
  //关闭eslint校验
  lintOnSave: false,
  devServer: {
    port: port,
    // 配置后端代理
    proxy: {
      '/api/v1': {
        // 不要写成 localhost:8000，跨域会失败
        target: 'http://localhost:5200',//****这里写上后端提供的基础地址 *****
        ws: true, //是否允许websocket
        secure: false,
        changeOrigin: true,
      },
    },
  },
}
