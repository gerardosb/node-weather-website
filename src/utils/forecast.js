const request = require('request')

const forecast = (long,lat, callback) => {
    const url = 'https://api.darksky.net/forecast/0fd4a09b833a3091b8c60a1b43825b0b/'+ lat+','+ long +'?units=si&lang=es'
    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('UNABLE TO CONNECT TO LOCATION SERVICES!');
        }else if(body.error){
            callback('Unable to find location ')
        }else {
            callback(undefined,{
                daily: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precip: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast
