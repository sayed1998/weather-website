const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');

const app = express();

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
        title: 'About Me',
        name: 'Wasim Khan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
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
                forecast: `${forecastData.weather_descriptions}. It is currently ${forecastData.temperature} degrees out. Feels like ${forecastData.feelslike} degrees.`,
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

app.listen('3000', () => {
    console.log('Server is running on port 3000.')
})