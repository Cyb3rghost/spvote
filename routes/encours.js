var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Sujet = require('../models/SujetModel');

/* GET home page. */
router.get('/', function(req, res, next) {

    var test;

    Sujet.find({ createdBy: req.session.userId, status: 'Inprogress' }).populate('createdBy').exec().then(result => {
        test = result

        //test = JSON.parse(test)
        //.sort({'_id': -1})
        console.log('MES SUJETS : ' + test)
        
        res.render('../views/encours', {
            user: req.session.userId,
            username: req.session.userName,
            sujet: test
        });

    });


});

module.exports = router;
