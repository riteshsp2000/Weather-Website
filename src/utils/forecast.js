const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/2bdd1e851e5e1f286d7ec4d494be6f97/' + latitude + ',' + longitude + '?units=auto'

  request({url: url, json: true}, (error,response) => {
    if(error) {
        callback('Unable to connect to weather services.', undefined)
    } else if (response.body.error) {
        callback('Unable to find location.', undefined)
    } else {
        callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
    }
  })
}

module.exports = forecast