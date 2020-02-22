const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;
//console.log(__dirname);
//console.log(path.join(__dirname,'../..'));
//console.log(path.join(__dirname,'../public'));

//Define paths for express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handlebars engines and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => { 
    res.render('index', {
        title: 'Weather',
        name : 'Sparsh Kasana'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Sparsh Kasana'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message : 'Help message',
        title : 'Help',
        name : 'Sparsh Kasana'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'Please enter an address.'
        })
    }

    let location = req.query.address
    geocode(location, (error, data) => {
        if (error) {
            return res.send({
                error : error
            });
        }
        
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error : error
                });
            }

            res.send({
                location: data.placename,
                forecast: forecastData,
                address: req.query.address
            })
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message :'Help article not found',
        title : '404',
        name : 'Sparsh Kasana'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        message :'Page not found',
        title : '404',
        name : 'Sparsh Kasana'
    });
});

//app.com

app.listen(port, () => {
    console.log('Server is up on port '+port);
});