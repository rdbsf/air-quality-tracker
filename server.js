var express = require('express');
var app = express();
    
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3004;

require('./routes')(app);
app.listen(port);