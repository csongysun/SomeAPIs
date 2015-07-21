var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var utility = require('utility');
//var ScoreItem = require('../models').ScoreItem;
//var ScoreItem = require('./scoreItem');

var ScoreItemSchema = new Schema({

		course : String,
		//isNe: Boolean,
		credit: Number,
		grade: String,
		grade1: String,
		grade2: String,

});

var ScoreSchema = new Schema({

	sid: { type: String},
	na: { type: String},
	items: [ScoreItemSchema]
	
//	lastUpdate: {type: Date}

});


// ScoreSchema.virtual('isNew').get(function(){
// 	console.log(this.lastUpdate.toDateString() +' '+ Date.now.toDateString);
// 	return this.lastUpdate.toDateString() === Date.now.toDateString;
// });

ScoreSchema.index({sid: 1}, {unique: true});

mongoose.model('Score', ScoreSchema);
//mongoose.model('ScoreItem', ScoreItemSchema);
