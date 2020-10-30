const request = require('request')

const forecast = (latitude, longitude,  callback) => {
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=56b4df6ae38045fea01213635201810&q=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&days=7';
    request({url: url, json: true}, (error, response)=>{
        if (error) {
            callback('Unable to connect to Weather services', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        }else{
            const boot = response.body.current
            callback(undefined, `it is currently ${boot.temp_c} degrees out. there is a ${boot.precip_mm} chance of rain `)
        }
    })
}


module.exports = forecast