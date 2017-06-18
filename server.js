const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
// hbs key :values
app.set('view engine', 'hbs');
//middleware function
app.use(express.static(__dirname + '/public'));

//middleware Express
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n');
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs')
// });

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome! We are learning with nodejs.',
		currentYear: new Date().getFullYear()
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs',{
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/Err', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});

app.listen(port,() => {
	console.log(('server is starting on port: ' + port));
});
