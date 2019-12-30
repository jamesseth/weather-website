const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const hbs = require('hbs')

const forecast = require('./utils/forcast')
const geocode = require('./utils/geocode')

//Define paths for Express config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views/')
const partialsPath = path.join(__dirname, '../templates/partials/')

// set up handlebars to work with express
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//Creating Routes
// landing page eg home / index  http://www.mywebsite.com/
app.get('', (req, res) => {
    
    res.render('index', {
        title: 'Weather',
        name: 'James Vlok'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'James Vlok'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'James Vlok'
    })
})

app.get('/products', (req, res) =>{
    if(Object.keys(req.query).length <= 0){
        // return is used as the code the res.send will still execute
        // even though a response has been sent... useful to do cleanup if required.
        return res.send({
            error: "You must provide a query string"
        })
    }

    console.log(req.query)
    res.send(req.query)
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "An address term must be provided."
        })
    }
    const address = req.query.address
    geocode(`${address}`, (error, data) => {
        if (error){
            return res.send({error: error})
        }
        console.log(data) 
        forecast(data, (err, currentWeather) =>{
            if(err){ 
                return res.send({error: error})
            }
            return res.send(currentWeather)
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help',
        name: 'James Vlok',
        error: 404, message: "Help article not found!"
    })
})

// Handle 404
app.get('*', (req,res)=>{
    res.render('error', {error: 404, message: "Not found!"})
})


//start server
app.listen(port, () => {
    console.log(`Server is running... 0.0.0.0:${port}`)
})