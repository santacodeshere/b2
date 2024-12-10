const express = require('express');
const routes = require('./routes');
const middleware = require('./middleware');

const app = express();

// Apply middleware
middleware(app);

// Apply routes
routes(app);

module.exports = app;