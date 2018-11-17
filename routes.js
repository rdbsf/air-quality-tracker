var request = require('request');
const cheerio = require('cheerio');

module.exports = function(app){
 
    app.get('/', function(req, res){

        request('http://feeds.enviroflash.info/rss/realtime/133.xml', function(error, response, body) {

                var parseString = require('xml2js').parseString;
                var xml = body; 
                parseString(xml, function (err, result) {

                    let airDescription = result.rss.channel[0].item[0].description[0];

                    let qualityRangeNew = [
                        {'max': 50, 'class': 'good'},
                        {'max': 100, 'class':  'moderate'},
                        {'max': 150, 'class':  'unheathy1'},
                        {'max': 200, 'class':  'unheathy2'},
                        {'max': 300, 'class':  'veryunheatlhy'},
                        {'max': 1000, 'class':  'hazardous'}
                    ];

                    const $ = cheerio.load(airDescription)
                    let qualityHtml = $('div table tbody tr:nth-child(2) td div:nth-child(3) div').html();
                    let qualityMessage = qualityHtml.split('-')[0].trim();
                    let aqi = qualityHtml.split('-')[1].trim().split(' ')[0];

                    let qualityClass = 'good';

                    let rangeFilter = qualityRangeNew.filter(val => {
                        return val.max >= parseInt(aqi, 10);
                    });

                    qualityClass = rangeFilter.shift().class;

                    res.render('index', { title: 'SF Air Quality', airDescription: airDescription, qualityClass: qualityClass, message: qualityMessage, aqi: aqi })

                });

            
        });


    });

    app.get('/aqi', function(req, res){
        request('http://feeds.enviroflash.info/rss/realtime/133.xml', function(error, response, body) {

                var parseString = require('xml2js').parseString;
                var xml = body; 
                parseString(xml, function (err, result) {
                
                    let airDescription = result.rss.channel[0].item[0].description[0];

                    let qualityRangeNew = [
                        {'max': 50, 'class': 'good'},
                        {'max': 100, 'class':  'moderate'},
                        {'max': 150, 'class':  'unheathy1'},
                        {'max': 200, 'class':  'unheathy2'},
                        {'max': 300, 'class':  'veryunheatlhy'},
                        {'max': 1000, 'class':  'hazardous'}
                    ];

                    const $ = cheerio.load(airDescription)
                    let qualityHtml = $('div table tbody tr:nth-child(2) td div:nth-child(3) div').html();
                    let qualityMessage = qualityHtml.split('-')[0].trim();
                    let aqi = qualityHtml.split('-')[1].trim().split(' ')[0];
                    
                    res.setHeader('Content-Type', 'application/json');
                    res.write(JSON.stringify({'aqi': aqi}));  
                });

        });
    });

  }
  