var request = require('request');
var feed = require('./feed')
module.exports = function(app){
 
    app.get('/', function(req, res){

        var initializePromise = feed();
        initializePromise.then(function(feedDetails) {

            let qualityRangeNew = [
                {'max': 50, 'class': 'good'},
                {'max': 100, 'class':  'moderate'},
                {'max': 150, 'class':  'unheathy1'},
                {'max': 200, 'class':  'unheathy2'},
                {'max': 300, 'class':  'veryunheatlhy'},
                {'max': 1000, 'class':  'hazardous'}
            ];

            let qualityClass = 'good';

            let rangeFilter = qualityRangeNew.filter(val => {
                return val.max >= parseInt(feedDetails.aqi, 10);
            });

            qualityClass = rangeFilter.shift().class;

            res.render('index', { title: 'SF Air Quality', airDescription: feedDetails.airDescription, qualityClass: qualityClass, message: feedDetails.message, aqi: feedDetails.aqi })

        }, function(err) {
            console.log(err);
        })


    });

    app.get('/aqi', function(req, res){

        var initializePromise = feed();
        initializePromise.then(function(result) {
            feedDetails = result;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({'aqi': feedDetails.aqi}));  

        });

    });

  }
  