const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// inicializamos express
const app = express()
const port = process.env.PORT || 3000


// RUTAS
// directorio publico
const publicDirectoryPath = path.join(__dirname, '../public')
// vistas para handlebar
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// seteamos el view engine a handeblars de express
app.set('view engine', 'hbs')
// indicamos ruta de las vistas
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



// setup statics directory to serve
app.use(express.static(publicDirectoryPath))

// relacionamos una ruta (root en este caso) a una respuesta 
// de renderizar una vista de handlebars con las variables "title" and "name"
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Gerardo Sánchez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Gerardo Sánchez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Gerardo Sánchez'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an Address'
        })
    }

    geoCode(req.query.address, (error, { longitude, latitude, location } = {}) => {

        if (error) {
            return res.send({
                message: 'You must provide an Address',
                error
            })
        }


        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    message: 'You must provide an Address',
                    error
                })
            }
            
            return res.send({
                location,
                forecastData
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

    console.log(req.query.gay)
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gerardo Sánchez',
        error: 'Articulo de ayuda no Encontrado'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gerardo Sánchez',
        error: 'Pagina no Encontrada'
    })
})

app.listen(port, () => {
    console.log('Servers up and running on port ' + port)
})
