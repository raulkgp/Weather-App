const express = require('express')
const { dirname } = require('path')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utiles/geocode')
const forecast = require('./utiles/forecast')
//console.log(__dirname)

const app = express()
const port = process.env.PORT || 3000
//define path for express config
const publicpath = path.join(__dirname, '../Public')
const viewpath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(publicpath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name : 'Shiva Choudhary'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        name : 'Shiva Choudhary'
    } )
})

app.get('/help', (req, res) => {
    res.render('help',{
        title : 'This is help page',
        name : "Shiva Choudhary",
    })
})

app.get('/weather', (req, res) => {
   if(!req.query.address){
       res.send( {
           error : "Please provide address",
       })
   }else {
       const address = req.query.address
       geocode(address, (error, {longitude, latitude} = {}) => {

        if(error){
             res.send("Error")
        } else {
  
           forecast(longitude,latitude, (error, forecastdata) => {
    
                 if(error){
                      res.send('Error')
                 } else {
                   res.send( {
                       Data : forecastdata }
                       ) }     
           })
        }
       
  })
   }
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        res.send( {
            error : "Please search something!"}
            )
    }else {
       res.send( {
          products : []
       })
    }
})

app.get('/help/*', (req,res) => {
    res.render('helpnot', {
        title : 'Help not found',
        name : 'Shiva Choudhary'
    })
})

app.get('*', (req, res) => {
    res.render('404page' ,{
        title : 'Page Not Found!',
        name : 'Shiva Choudhary',
    })
})

app.listen(port, () => {
    console.log('Server is started at port ' + port)
})
