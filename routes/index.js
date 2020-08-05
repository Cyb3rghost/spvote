var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/UserModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../views/connexion', {
    user: req.session.userId,
    username: req.session.userName
  });
});

module.exports = router;
