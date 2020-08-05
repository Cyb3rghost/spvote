var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Sujet = require('../models/SujetModel');

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

    var sujet = req.body.sujet
    var quota = req.body.quota
    var listeChoix = req.body.cacheListeChoix

    const tableauChoix = listeChoix.split(',');

    if (req.body.sujet &&
        req.body.quota &&
        req.body.cacheListeChoix) {

            var sujetData = {
                subject: sujet,
                quota: quota,
                choices: tableauChoix,
                nbVote: 0,
                participants: [],
                createdBy: req.session.userId,
                status: 'Created'
            
            }

            Sujet.create(sujetData, function (err, user) {
                if (err) {
                  return next(err)
                } else {
                  return res.redirect('/sujet');
                }
            });

    }


});

module.exports = router;