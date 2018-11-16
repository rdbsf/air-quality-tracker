var http = require('http');

module.exports = function(app){
    //var mixes = require('./controllers/mixes');

    app.get('/', function(req, res){

        http.get('http://feeds.enviroflash.info/rss/realtime/133.xml', function(res) {
            var response_data = '';
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                response_data += chunk;
            });
            res.on('end', function() {
                //callback(null, response_data)
                res.setHeader('Content-Type', 'application/json');
                //res.write(JSON.stringify({'airquality': '1.0'}));  
                res.write(response_data);  
            });
            res.on('error', function(err) {
                callback(err);
            });
        });

        
    });
    //app.get('/latest', mixes.findMostRecent);
    //app.get('/random', mixes.findRandom);
  }
  