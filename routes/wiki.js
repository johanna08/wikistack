var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 
module.exports = router;

// GET /wiki
//retrieve all wiki pages
router.get('/', function(req, res, next) {
  Page.findAll// optional empty obj({})
  	.then(function(thePages){
  		res.render('index', {
  			pages: thePages
  		});
  	})	
  	.catch(next);
});

// POST /wiki
router.post('/add', function(req, res, next) {
	// res.json(req.body);
	req.body.status = 'open';
  var newPage = Page.build(req.body);
  newPage.save()
  .then(function(savedPage){
  	console.log('Redirect??')
  	res.redirect(savedPage.route);
  })
  .catch(next);
  // (function(err){
  // 	next(err);
  // });
  // res.json('/wiki');
  // //res.redirect needs path when goes thru app.js again
});

// GET /wiki/add
router.get('/add', function(req, res, next) {
  res.render('addpage');
});


// GET /wiki/newTitledPage
router.get('/:urlTitle', function(req, res, next){
  var urlTitleOfAPage = req.params.urlTitle;
//find gives us an array of pages
//findOne gives us just 1 page
  Page.find({
    where: {
      urlTitle: urlTitleOfAPage
    }
  })
  .then(function(page){
    if (page === null) {
        return next(new Error('That page was not found!'));
    }
    res.render('wikipage', {
      page: page
    });
  })
  .catch(next); 
  //can shorten the err handling in catch
        //(function(err){
  //   next(err);
  // });

});
