var request = require('request');
const cheerio = require('cheerio');

module.exports = function(app){
    //var mixes = require('./controllers/mixes');

    app.get('/', function(req, res){

        request('http://feeds.enviroflash.info/rss/realtime/133.xml', function(error, response, body) {

                var parseString = require('xml2js').parseString;
                var xml = body; //"<root>Hello xml2js!</root>"
                parseString(xml, function (err, result) {

                    let airDescription = result.rss.channel[0].item[0].description[0];
    
                    const rangeGoodMax = 50;
                    const rangeModerateMax = 100;
                    const rangeUnhealthy1Max = 150;
                    const rangeUnhealthyMax = 200;
                    const rangeVeryunhealthyMax = 300;

                    let qualityRange = [50,100,150,200,300];
                    let qualityClasses = ['good', 'moderate', 'unheathy1', 'unheathy2', 'hazardous'];
                    
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
                    let aqi = qualityHtml.split('-')[1].trim().split(' ');

                    let qualityClass = 'good';

                    let rangeFilter = qualityRangeNew.filter(val => {
                        return val.max >= parseInt(aqi, 10);
                    });

                    qualityClass = rangeFilter.shift().class;

                    res.render('index', { title: 'SF Air Quality', airDescription: airDescription, qualityClass: qualityClass, message: qualityMessage, aqi: aqi[0] })

                });

            
        });


    });

  }
  