const request = require('request')
const API_URL = require('../global_constants')

const forecast = (latitude, longitude, callback) => {
    const url = API_URL.weatherAPI(latitude, longitude)

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(response.body.error){
            callback('Unable to find weather for this location. Try another search.', undefined)
        }else{
            callback(undefined, {
                weather_descriptions: response.body.current.weather_descriptions[0],
                location: response.body.location.name,
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                weatherIcons: response.body.current.weather_icons[0],
                humidity: response.body.current.humidity
            })
        }
    })
}

module.exports = forecast