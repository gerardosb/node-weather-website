const request = require('request')

const forecast = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/0fd4a09b833a3091b8c60a1b43825b0b/' + lat + ',' + long + '?units=si&lang=es'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('UNABLE TO CONNECT TO LOCATION SERVICES!');
        } else if (body.error) {
            callback('Unable to find location ')
        } else {
            callback(undefined, body.daily.data[0].summary + ' Actualmente la temperatura es  ' + body.currently.temperature + ' grados centigrados. La temperatura mas alta para el dia es de ' + body.daily.data[0].temperatureHigh +' y la mas baja de ' + body.daily.data[0].temperatureLow +' y hay ' + body.currently.precipProbability + '% probabilidades de lluvia'
            )
        }
    })
}

module.exports = forecast
