var express = require('express');
var app = express();
app.set('view engine', 'pug');

require('./routes')(app);
module.exports = app;