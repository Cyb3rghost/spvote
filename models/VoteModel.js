var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var Schema   = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var VoteSchema = new mongoose.Schema({
	user: {
		type: ObjectId,
		required: true,
		ref: 'User'
	 },
	 sujet: {
		type: ObjectId,
		required: true,
		ref: 'Sujet'
	 },
	 choice: {
		// Index du choix du tableau
		// Ex : ['oui', 'non', 'peut être']
		// Ex: Je choisi oui, on stock l’index 0 
		type: Number,
		default: null
	},
	namechoice: {
		type: String
	} 
});

module.exports = mongoose.model('Vote', VoteSchema);


