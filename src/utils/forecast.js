const request = require('request')
const moment = require('moment')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/2bdd1e851e5e1f286d7ec4d494be6f97/' + latitude + ',' + longitude + '?units=auto'

  request({url: url, json: true}, (error,response) => {
    if(error) {
        callback('Unable to connect to weather services.', undefined)
    } else if (response.body.error) {
        callback('Unable to find location.', undefined)
    } else {
        callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' °C out. There is a ' + response.body.currently.precipProbability + '% chance of rain. Sunrise: ' + moment(response.body.daily.data[0].sunriseTime, 'X').format('LT') + '. Sunset: ' + moment(response.body.daily.data[0].sunsetTime, "X").format('LT') + ' Maximum Temperature: ' + response.body.daily.data[0].temperatureHigh + '°C. Minimum Temperature: ' + response.body.daily.data[0].temperatureLow + '°C.')
    }
  })
}

module.exports = forecast