const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Ultra-permissive CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'CORS Proxy is working!' });
});

// Proxy all requests to the main backend
app.use('/api', createProxyMiddleware({
  target: 'https://aitools-api-fresh.vercel.app',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // remove /api prefix
  },
}));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`CORS Proxy running on port ${PORT}`);
});
