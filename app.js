// express and middlewares
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

// router
const router = require('./router');


// Using express js
const app = express();

// Express middlewares
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}));
app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// API routes
router(app);

module.exports = app;