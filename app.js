var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require ('swig');
//this is a route to require the subrouter
var router = require('./routes/wiki');
var fs = require('fs');
var path = require ('path');
var bodyParser = require('body-parser');
var models = require('./models');


//logging middleware
//
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//express static looks in router first, and if doesnt find anything looks in default path index.html
app.use(express.static(path.join(__dirname, '/views/index.html')));
//subrouter should live here, after app looks for other file paths
app.use('/wiki', router);

app.get('/', function (req, res) {
    res.redirect('/wiki');
});

// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});


//middleware to handle errors
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send(err.message);
});

// Where your server and express app are being defined:
models.User.sync()
.then(function () {
    return models.Page.sync();
})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);

