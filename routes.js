var request = require('request');
var feed = require('./feed')
var quality = require('./quality')

module.exports = function(app){
 
    app.get('/aqi', function(req, res){

        var initializePromise = feed();
        initializePromise.then(function(feedDetails) {
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({'aqi': feedDetails.aqi}));  
            res.end();
        });

    });

    app.get('/', function(req, res){

        var initializePromise = feed();
        initializePromise.then(function(feedDetails) {
            
            res.render('index', { 
                title: 'SF Air Quality', 
                airDescription: feedDetails.airDescription, 
                qualityClass: quality(feedDetails.aqi), 
                message: feedDetails.message, 
                aqi: feedDetails.aqi })

        }, function(err) {
            console.log(err);
        })

    });

  }