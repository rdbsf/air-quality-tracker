
var request = require('request');
const cheerio = require('cheerio');

module.exports = function(){
    // Setting URL and headers for request
    var options = {
        url: 'http://feeds.enviroflash.info/rss/realtime/133.xml',
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise 
    return new Promise(function(resolve, reject) {
        
        request(options, function(error, response, body) {

                if (error) {
                    reject(err);
                } else {

                    var parseString = require('xml2js').parseString;
                    var xml = body; 
                    parseString(xml, function (err, result) {

                        let airDescription = result.rss.channel[0].item[0].description[0];
                        let qualityMessage = 'Current AQI Unavailable';
                        let aqi = '-';

                        const $ = cheerio.load(airDescription)
                        let qualityHtml = $('div table tbody tr:nth-child(2) td div:nth-child(3) div').html();
                        if (qualityHtml)
                        {
                            qualityMessage = qualityHtml.split('-')[0].trim();
                            aqi = qualityHtml.split('-')[1].trim().split(' ')[0];
                        }
                    
                        resolve({ airDescription: airDescription, message: qualityMessage, aqi: aqi });

                    });

                }
        });

    })

}

//module.exports.method = initialize;