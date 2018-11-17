
const app = require('./app');

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3004;

app.listen(port);