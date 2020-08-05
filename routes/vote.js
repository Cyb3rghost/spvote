var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Sujet = require('../models/SujetModel');
var Vote = require('../models/VoteModel');

/* GET home page. */
router.get('/:idvote/:choix/:idsujet/:quota', function(req, response) {

    const mongo = {
        uri: 'mongodb://localhost:27017/simplon',
        opt: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
        }
    };
      
    mongoose.connect(mongo.uri, mongo.opt)

    //mongoose.set('debug', true)

    var idVote = req.params.idvote;
    var choix = req.params.choix;
    var idSujet = req.params.idsujet;
    var Quota = req.params.quota;

    Vote.findOne({ user: req.session.userId, sujet: idSujet }).select("user").lean().then(result => { // ON VERIFIE QU'UN VOTE NULL EXISTE

        if (result) {
            // user exists...

            // ON TEST SI LE VOTE AVEC L'INDEX EXISTE.
            Vote.findOne({ user: req.session.userId, sujet: idSujet, choice: { $ne: null } }).select("user").lean().then(resultdeux => { 

                if (resultdeux) {

                    req.session.msgFlash = { type: "danger", message: "Vous avez déjà voté pour ce sujet." };

                    response.redirect('/visualisation/' + idSujet)

                }
                else
                {

                    Vote.findByIdAndUpdate(result._id, { $set: { choice: idVote, namechoice: choix }}, function (err, resultat) {
                    
                        console.log(resultat)
                
                    });

                    Vote.find({ sujet: idSujet, choice: { $ne: null }, namechoice: { $ne: null } }).count(function(err, count){

                        if(count == Quota)
                        {
                
                            Sujet.findByIdAndUpdate(idSujet, { $set: { status: 'Finished' }}, function (err, res) {
                    
                                console.log(res)
                        
                            });

                            console.log('Count : ' + count + ' / Quota : ' + Quota)

                        }


                        response.redirect('/visualisation/' + idSujet)


                    })

                    //response.send('Update vote ! ');

                }


            }).catch(error);

        }
        else
        {

            req.session.msgFlash = { type: "danger", message: "Vous êtes n\'êtes pas inscrit à ce sujet. Vous ne pouvez pas voté." };

            response.redirect('/visualisation/' + idSujet)

        }

    });


});

module.exports = router;