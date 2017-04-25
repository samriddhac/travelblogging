const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const DarkSky = require('dark-sky');
const API_KEY = 'e5256f7af949d0a52aac060282dd106f';
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/weather/:lat/:lng', (req, res) => {
	const forecast = new DarkSky(API_KEY);
	forecast
    .latitude(req.params.lat)
    .longitude(req.params.lng)
    .units('si')
    .language('en')
    .exclude('minutely,daily,hourly,flags')
    .extendHourly(true)
    .get()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => {
        console.log(err);
    })
});

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports=app;