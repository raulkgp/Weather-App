const request = require('request')

const geocode = (adress, callback) => {
    const url =  'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) +  '.json?access_token=pk.eyJ1Ijoic2hpdmE3MzMxIiwiYSI6ImNrbWJwdTB5cDFybnQycHM5YW5lNWZ3MzkifQ.-6YXsfQL0hDfG4aa-MdmUA&limit=1'  
    
    request( { url, json:true}, (error, { body }) => {
          if(error){
              callback('Unable to connect with weather service',undefined)
          }else if(body.features.length === 0){
              callback('Unable to find location, Try another search?', undefined)
          }else{
              callback(undefined, {
                  longitude : body.features[0].center[1],
                  latitude : body.features[0].center[0]
              })
          }
    })
}


module.exports = geocode