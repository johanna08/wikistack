var express = require('express');
var router = express.Router();
// var wikiRouter = require('./routes/wiki');
// ...
// app.use('/wiki', wikiRouter);
// or, in one line: app.use('/wiki', require('./routes/wiki'));
module.exports = router;

//retrieve all wiki pages
router.get('/', function(req, res, next) {
  res.redirect('/');
  next();
});

router.post('/', function(req, res, next) {
  res.json(req.body);
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

