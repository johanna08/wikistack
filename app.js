var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require ('swig');
var router = require('./routes');
var fs = require('fs');
var path = require ('path');
var bodyParser = require('body-parser');


//logging middleware
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', router);

//express static looks in router first, and if doesnt find anything look sin default path index.html
app.use(express.static(path.join(__dirname, '/views/index.html')));

// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});


var server = app.listen(1337, function(){
	console.log('listening on port 1337');
});