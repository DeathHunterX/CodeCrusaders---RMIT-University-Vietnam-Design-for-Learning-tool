const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  if (process.env.NODE_ENV === 'development') {
    app.use(
      '/api',
      createProxyMiddleware({
        // target: 'http://localhost:8080/v1',
        target: 'http://35.76.125.226:8080/v1',
        changeOrigin: true,
        secure: false,
      })
    );
  }
};