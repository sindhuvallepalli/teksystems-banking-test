var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  req.status(200).send('Hello World!');
});

module.exports = router;
