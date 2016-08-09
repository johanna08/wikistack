var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 
module.exports = router;
//retrieve all wiki pages
router.get('/', function(req, res, next) {
  
  res.send('hello');
});

router.post('/add', function(req, res, next) {
	// res.json(req.body);
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });
  page.save();

  // res.json('/wiki');
  //res.redirect needs path when goes thru app.js again
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next) {
  // res.send('hit dynamic route at ' + req.params.urlTitle);
  Page.findOne({ 
    where: { 
      urlTitle: req.params.urlTitle 
    } 
  })
  .then(function(foundPage){
    res.json(foundPage);
  })
  .catch(next);

});




