'use strict'

var express = require('express');

var router = express.Router();

var natural = require('natural');

router.post('/stem', function (req, res) {

  natural.PorterStemmer.attach();
  res.send({stems: req.body.text.tokenizeAndStem()})


})

module.exports = router
