const request = require('request')

const fortcast = (location, callback, unit='si') =>{
    const darksky_options = { 
        url: `https://api.darksky.net/forecast/502dd82d0901c2dc20e41fde30bb676d/${location.latitude},${location.longitude}?units=${unit}`,
        json: true
    }
    request(darksky_options, (error, response) => {
        if (error){
            callback('unable to connect to weather service!', undefined)
        } else if (response.body.error){
            callback(response.body.error, undefined)
        } else if (response.body.currently.length === 0 ){
            callback("No weather data for location of interest available.", undefined)
        } else {
            const {summary, temperature, precipProbability: chanceOfRain} = response.body.currently
            callback(undefined, {
                location: `${location.location}`, 
                summary,
                temperature,
                chanceOfRain
            })
        }
    })
}

module.exports = fortcast