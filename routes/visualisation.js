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
    var Score = [];

    /*Sujet.findById(idSujet)
        .then(res => {
            console.log(res)
            Vote.find({ sujet: idSujet})
                .then()
        });*/



    Sujet.findById(idSujet, function (err, res) {

        console.log(res)
        var infosSujet = res
        
        var tableauScore = new Array();
        var choix = new Object();
        choix.nom = "";

        var index = 0;

        tableauScore.push(choix)

        Vote.find({ sujet: idSujet}, function (err, resultat) {
            console.log('ON COMPREND PAS : ' + resultat)

            console.log('DEBUG : ' + infosSujet.status)

            if(infosSujet.status === 'Finished')
            {

                resultat.forEach(element => {


                    if(tableauScore[index].nom === element.namechoice)
                    {
    
                        tableauScore[index].nbr = tableauScore[index].nbr + 1
    
                    }
                    else
                    {
                        
                        tableauScore.push({'nom': element.namechoice, 'nbr': 1})
    
                    }
    
                    index++;
                    
                    
    
                });
    
                tableauScore.shift();
                console.log(tableauScore)


            }
            
            response.render('../views/visualisation', {
                user: req.session.userId,
                username: req.session.userName,
                sujet: infosSujet,
                score: tableauScore
            });

        });
        
    }).populate('createdBy').exec();



});

module.exports = router;