const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

// Paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Wasim Khan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Wasim Khan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Wasim Khan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({
                error: error
            })
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: `${forecastData.weather_descriptions}. It is currently ${forecastData.temperature} degrees out. Feels like ${forecastData.feelslike} degrees out. The humidity ${forecastData.humidity}%.`,
                location: data.location,
                address: req.query.address,
                icon: forecastData.weatherIcons,
                temperature: forecastData.temperature
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error_msg: 'Help article not found!',
        name: 'Wasim Khan'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error_msg: '404 not found!',
        name: 'Wasim Khan'
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})