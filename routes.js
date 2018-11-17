var request = require('request');

module.exports = function(app){
    //var mixes = require('./controllers/mixes');

    app.get('/', function(req, res){

        request('http://feeds.enviroflash.info/rss/realtime/133.xml', function(error, response, body) {
                //res.setHeader('Content-Type', 'application/json');
                //res.write(JSON.stringify({'airquality': '1.0'}));  
                // var parseString = require('xml2js').parseString;
                // var xml = body;//"<root>Hello xml2js!</root>"
                // parseString(xml, function (err, result) {
                //     //console.dir(result);
                //     res.write(result);  
                // });

                var parseString = require('xml2js').parseString;
                var xml = body; //"<root>Hello xml2js!</root>"
                parseString(xml, function (err, result) {
                    //res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Content-Type', 'text/html');
                    let airDescription = result.rss.channel[0].item[0].description[0];
                    //res.write(JSON.stringify({'air': airDescription}));  
                    res.write(airDescription);  
                });

                
           
        });

        
    });
    //app.get('/latest', mixes.findMostRecent);
    //app.get('/random', mixes.findRandom);
  }
  