var request = require('request');
const cheerio = require('cheerio');

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
                    //res.setHeader('Content-Type', 'text/html');
                    let airDescription = result.rss.channel[0].item[0].description[0];
                    //res.write(JSON.stringify({'air': airDescription}));  
                    //res.write(airDescription);  
const rangeGoodMax = 50;
const rangeModerateMax = 100;
const rangeUnhealthyMax = 200;
const rangeVeryunhealthyMax = 300;

const $ = cheerio.load(airDescription)
let qualityHtml = $('div table tbody tr:nth-child(2) td div:nth-child(3) div').html();
let qualityMessage = qualityHtml.split('-')[0].trim();
let aqi = qualityHtml.split('-')[1].trim().split(' ');


res.render('index', { title: 'SF Air Quality', airDescription: airDescription, qualityClass: 'veryunheatlhy', message: qualityMessage, aqi: aqi[0] })

                    // parseString(airDescription.trim(), function (err, result) {

                    //     res.render('index', { title: 'SF Air Quality', message: result })

                    // });

                    
                });

                
           
        });

        
    });
    //app.get('/latest', mixes.findMostRecent);
    //app.get('/random', mixes.findRandom);
  }
  