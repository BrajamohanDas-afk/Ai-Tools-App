const serverlessExpress = require('@vendia/serverless-express');
const app = require('./server'); // This imports your existing server.js

exports.handler = serverlessExpress({ app });