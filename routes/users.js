var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/cool', (req, res, next) => {
	res.render('index', {title: 'cool', message: 'You\'re so cool! Why don\'t you give me call?'});
});

module.exports = router;
