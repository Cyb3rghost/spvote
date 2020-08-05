var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const bcrypt = require('bcrypt');
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

    if (req.body.email && req.body.password) {
        User.findOne({ email: req.body.email })
            .exec(function (err, user) {
            if (err) {
                return next(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return next(err);
            }
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result === true) {
                    req.session.userId = user._id;
                    req.session.userName = user.username;
                    res.redirect('/sujet')
                } else {
                return next(err);
                }
            })
        });
    } else {
        req.session.msgFlash = { type: "danger", message: "Email et mot de passe requis." };
        return next(err);
    }





});

module.exports = router;
