module.exports = function(app){
    //var mixes = require('./controllers/mixes');

    app.get('/', function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({'airquality': '1.0'}));  
    });
    //app.get('/latest', mixes.findMostRecent);
    //app.get('/random', mixes.findRandom);
  }
  