

module.exports = function(aqi){

    if (aqi === '-')
    {
        return 'unavailable';
    }
    
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
        return val.max >= parseInt(aqi, 10);
    });

   qualityClass = rangeFilter.shift().class;

   return qualityClass;

};