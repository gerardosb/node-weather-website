const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ2VyYXJkb3NiIiwiYSI6ImNqeTA3ZGxoZzAwNnEzZHAyems4NjNhbm0ifQ.NGDVoLl7cjzDv6zKhLOgvA&limit=1'
    request({ url, json: true}, (error,{body}) => {
        if(error){
            callback('UNABLE TO CONNECT TO LOCATION SERVICES!');
        }else if(body.features.length === 0){
            callback('Unable to find location ')
        }else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode