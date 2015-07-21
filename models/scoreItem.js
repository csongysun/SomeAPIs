var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var utility = require('utility');

var ScoreItemSchema = new Schema({

		course : String,
		//isNe: Boolean,
		credit: Number,
		grade: String,
		grade1: String,
		grade2: String,

});
console.log("111");

mongoose.model('ScoreItem', ScoreItemSchema);
//exports.ScoreItem = mongoose.model('ScoreItem');
//mongoose.model('ScoreItem', ScoreItemSchema);