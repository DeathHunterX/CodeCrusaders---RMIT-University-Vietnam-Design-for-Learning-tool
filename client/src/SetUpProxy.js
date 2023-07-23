const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://35.76.125.226:8080/v1',
      changeOrigin: true,
      secure: false,
    })
  );
};