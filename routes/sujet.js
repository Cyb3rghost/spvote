var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Sujet = require('../models/SujetModel');

/* GET users listing. */
/*router.get('/', async function(req, res, next) {

  var sujets = await Sujet.find({'createdBy': }).populate('users'); // BIZARRE NE FONCTIONNE PAS SANS LE AWAIT
 
  //.sort({'_id': -1})
    console.log(sujets)

  res.render('../views/sujet', {
    user: req.session.userId,
    sujet: sujets,
  });
});*/

router.get('/',  function(req, res, next) {

    var test;

    Sujet.find().sort({'_id': -1}).populate('createdBy').exec().then(result => {
        test = result

        //test = JSON.parse(test)
        //.sort({'_id': -1})
        console.log(test)
        
        res.render('../views/sujet', {
            user: req.session.userId,
            username: req.session.userName,
            sujet: test,
        });

    });
   
  
});

module.exports = router;
