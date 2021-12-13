
const geoCodeAPI = (address) => {
    return `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1Ijoid2FzaW1rMTk5OCIsImEiOiJja3d3M2x3MGsyNjNoMm9xbzk5Z2U3N3JmIn0.Cy0HHeEG3hlFECZ79MQbhQ`;
}

const weatherAPI = (latitude, longitude) => {
    return `http://api.weatherstack.com/current?access_key=4e767c481f8b26d06eb76402975ea490&query=${latitude},${longitude}`;
}

module.exports = {
    geoCodeAPI: geoCodeAPI,
    weatherAPI: weatherAPI
}