const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://3.38.102.201:80",
      changeOrigin: true,
    })
  );
};
