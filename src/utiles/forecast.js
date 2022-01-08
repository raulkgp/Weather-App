const request = require('request')



const forecast = (latitude, longitute, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=10fb56286841899cb35182dfbddd3aba&query=' + latitude + ',' + longitute 

    request( { url , json: true}, (error, { body }) => {
       if(error){
           callback('check your internet connection', undefined)
       } else if (body.error){
          callback('Unable to find location', undefined)
       } else {
           callback(undefined, 'It is currently ' + body.current.temperature + ' degree out. ' + 'It feels like '  + body.current.feelslike + ' degree out.')
       }
    })
}

module.exports = forecast
