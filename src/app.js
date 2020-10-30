const path = require('path');
const express = require('express')
const hbs = require('hbs');
const { registerPartials } = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, 'templates/views')
const partialsPath = path.join(__dirname, 'templates/partials')

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setup handlebars and views location
app.set('views', viewsPath );
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'JONPRESH'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'JONPRESH'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Call for help',
        name: 'JONPRESH'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }else {
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error : error
            })
        }
        forecast(latitude, longitude, (error, zata) => {
            if (error) {
                return res.send({
                    error : 'provide forecast'
                })
            }
            res.send({
                address: req.query.address, 
                location: location,
                forecast: zata
            })
        })
    })
}


        //console.log(req.query)
        
    // res.send([{
    //     location: "nigeria"
    // },{
    //     forecast: "it is currently 1254.256 degrees out. there is a 0 chance of rain  "
    // }])
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        })
    }
    console.log(req.query)
        res.send({
            products: []
        })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        error: 'Page not found',
        name: 'JONPRESH'
    })
})

app.listen(3000)