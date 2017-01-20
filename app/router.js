'use strict'

var express = require('express');

var router = express.Router();

router.post('/stem', function (req, res) {
  res.send(200);
})

module.exports = router
