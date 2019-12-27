const request = require('request')


const geocode = (address, callback) => {
    url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamFtZXNzZXRoIiwiYSI6ImNrNDlpZzVmZzAzemYzbm14ajVncDQyanMifQ.Mh7dvz9Xst2TLA4u_cpyoA`
    request({url: url, json:true}, (error, response) =>{
        if(error){
            callback(error, undefined)
        }else if (response.body.features.length === 0){
            callback(`Unable to find location for '${address}', Try another search.`)
        }else{
            const {center, place_name: location} = response.body.features[0]
            callback(undefined, {
                latitude: center[0],
                longitude: center[1],
                location
            })
        }
    })
}

module.exports = geocode