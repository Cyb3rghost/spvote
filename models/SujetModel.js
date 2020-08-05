var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var SujetSchema = new Schema({
	subject: {
		type: String,
		required: true
	   },
	   quota: {
		 type: Number,
		 required: true,
		 validate : {
			validator : Number.isInteger,
			message   : '{VALUE} is not an integer value'
		 }
	   },
	   choices: {
	   // array string ex: ['oui', 'non', 'peut être']
	   },
	   nbVote: {
		type: Number,
		required: true,
		validate : {
		   validator : Number.isInteger,
		   message   : '{VALUE} is not an integer value'
		}
	   },
	   participants: {
	   // Array des Object ID des utilisateurs qui participent au vote
	   },
	   createdBy: {
		   type: ObjectId,
		   ref: 'User'
	   // Object ID de l'utilisateur qui a créer le sujet de vote
	   },
	   status: {
		// On peut avoir 3 valeurs : created,inprogress,finished
		type: String,
		required: true
	},

});

module.exports = mongoose.model('Sujet', SujetSchema);
