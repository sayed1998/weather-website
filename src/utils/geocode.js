const request = require('request')
const API_URL = require('../global_constants')

const geocode = (address, callback) => {
    const url = API_URL.geoCodeAPI(address);

    request({url: url, json: true}, (error, response)=> {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if(response.body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode