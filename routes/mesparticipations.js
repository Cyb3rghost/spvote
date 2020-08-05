var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Vote = require('../models/VoteModel');

/* GET home page. */
router.get('/', function(req, res, next) {

    var test;

    Vote.find({ user: req.session.userId, sujet: { $ne: null } }).populate('sujet').populate('user').exec().then(result => {
        test = result

        //test = JSON.parse(test)
        //.sort({'_id': -1})
        console.log('MES SUJETS : ' + test)
        
        res.render('../views/mesparticipations', {
            user: req.session.userId,
            username: req.session.userName,
            sujet: test
        });

    });


});

module.exports = router;
