var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Sujet = require('../models/SujetModel');
var Vote = require('../models/VoteModel');

/* GET home page. */
router.get('/:idsujet', function(req, response) {

    const mongo = {
        uri: 'mongodb://localhost:27017/simplon',
        opt: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
        }
    };
      
    mongoose.connect(mongo.uri, mongo.opt)

    var idSujet = req.params.idsujet;
    
    var voteData = {
        user: req.session.userId,
        sujet: idSujet,
        choice: null,
        namechoice: null
    }

    Vote.findOne({ user: req.session.userId, sujet: idSujet }).select("user").lean().then(result => {
        console.log(result)
        if (result) {
            // user exists...
            req.session.msgFlash = { type: "danger", message: "Vous êtes déjà inscrit à ce sujet ! Inscription impossible." };

            response.redirect('/sujet')
        }
        else
        {


            Vote.create(voteData, function (err, user) {
                if (err) {
                  return next(err)
                } else {
        
                    Sujet.findById(idSujet, function (err, res) {
        
                        if(res.quota === res.participants.length)
                        {
                
                            req.session.msgFlash = { type: "danger", message: "Ce sujet est complet. Impossible de participer." };

                            response.redirect('/sujet')
                
                        }
                        else
                        {
                
                            var nouveauParticipant = res.participants;
                
                            nouveauParticipant.push(req.session.userId)
                
                            Sujet.findByIdAndUpdate(idSujet, { $set: { participants: nouveauParticipant }}, function (err, res) {
                    
                                console.log(res)
                        
                            });


                            Vote.findOne({ sujet: idSujet }).count(function(err, count){

                                if(count === res.quota)
                                {
                        
                                    Sujet.findByIdAndUpdate(idSujet, { $set: { status: 'Inprogress' }}, function (err, res) {
                            
                                        console.log(res)
                                
                                    });

                                }

                                console.log('Count : ' + count)

                            })

                            response.redirect('/sujet');
                
                            //res.send('Hellow ! Sujet : ' + idSujet)
                
                        }
                        //console.log(res.participants)
                
                    });
        
                    
                    //res.send('Hellow ! Sujet : ' + idSujet)
        
                }
            });
        }
    });

});

module.exports = router;
