const request = require('request');

const geocode = (address, callback) => {
    const url2= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWVydWVtdWx0aW1hdGUiLCJhIjoiY2s2ZjJiZ3c0MGN1MTNta3dzaXB6cHljNiJ9.ch9yjRiqBFfDDghyodfKnw&limit=1';

    request ({url: url2, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        }
        else if(!response.body.features[0]){
            callback('Unable to find location. Try another place!', undefined);
        }
        else {
            const temp1 = response.body.features[0]
            callback(undefined, {
                latitude: temp1.center[1],
                longitude: temp1.center[0],
                placename: temp1.place_name
            });
        }
    })
}

module.exports = geocode;