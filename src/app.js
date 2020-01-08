const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define Paths for express config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ritesh Patil'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Ritesh Patil'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some useful text to display.',
    title: 'Help',
    name: 'Ritesh Patil'
  })
})

app.get('/weather', (req, res) => {
  address = req.query.address

  if (!address) {
    return res.send({
      error: 'You must provide a address.'
    })
  }

  geocode(address, (error, { latitude, longitude, location } = {} ) => {
    if (error) {
      return res.send({error})
    }
  
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }
  
      res.send({
        forecast: forecastData,
        location: location,
        address: address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }


  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) =>{
  res.render('404', {
    title: '404',
    name: 'Ritesh Patil',
    errorMessage: '404: Page not found'
  })
})

app.get('*', (req, res) =>{
  res.render('404', {
    title: '404',
    name: 'Ritesh Patil',
    errorMessage: '404: Help Article not found'
  })
})

app.listen(3000, () => {
  console.log('The Server is started at port 3000')
})


