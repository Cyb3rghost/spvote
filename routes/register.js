var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/UserModel');

/* GET users listing. */
router.post('/', function(req, res, next) {

    const mongo = {
        uri: 'mongodb://localhost:27017/simplon',
        opt: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
        }
    };
      
    mongoose.connect(mongo.uri, mongo.opt)

    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {

        User.findOne({ $or:[ {'email':req.body.email}, {'username':req.body.username}] }).lean().then(result => {

          if(result)
          {

              req.session.msgFlash = { type: "danger", message: "Un compte existe déjà avec cette adresse email." };
              
              res.redirect('/inscription');

          }
          else
          {

              var userData = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
              }
              //use schema.create to insert data into the db
              User.create(userData, function (err, user) {
                if (err) {
                  return next(err)
                } else {

                  res.redirect('/connexion');
                }
              });

          }


        });


    }


});

module.exports = router;
