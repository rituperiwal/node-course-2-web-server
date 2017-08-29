const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); 


app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to append to file.');
		}
	});
	next();
});

app.use((req, res, next) => {
	res.render('maintainence.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => { 
	res.render('home.hbs', {
		pageTitle: 'Homepage',
		welcomeMessage: 'Hello there! Welcome to our site.'
	});
	//res.send('<h1>Hello Express!</h1>');
	/*res.send({
		name: 'Ritu',
		likes: [
			'Biking',
			'Sleeping' 
		]
	})*/
}); 
 
app.get('/about', (req, res) => {
	//res.send('About page.');
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

// /bad errorMessage json
app.get('/bad', (req, res) => {
	res.send({
		errorMessage: '<b style="color: red;">Bad request received.</b>'
	});
});

app.listen(3000, () => console.log("express has started on port 3000"));