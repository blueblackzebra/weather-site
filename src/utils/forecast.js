const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url ='https://api.darksky.net/forecast/9443755244a7c5b3feed24706decf91c/' + latitude +',' +longitude +'?units=ca&exclude=[minutely,hourly]';

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services.', undefined);
        }
        else if(response.body.error){
            callback('Unable to find location', undefined);
    
        }
        else{
            const temp = response.body.currently;
            const temp2 = response.body.daily;
            callback(undefined, temp2.data[0].summary +' It is currently '+temp.temperature+' degrees out. There is a '+temp.precipProbability+'% chance of rain.');
        }
    } );
}

module.exports = forecast;