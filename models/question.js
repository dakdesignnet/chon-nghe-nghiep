var mongoose = require('mongoose');
var chema = mongoose.Schema;
ObjectID = require('mongoose').ObjectID;
var mySchema = mongoose.Schema({
	name: {
		type: String
	},
	
	typequetsion: {
		type: String,
		require: true
	},
	answer: {
		type: Array
	},
	note: {
		type: String
	}
});

var question = module.exports = mongoose.model('question', mySchema);

module.exports.getQuestion = function(limitquestion, callback) {
	question.find(callback).limit(limitquestion);
}
module.exports.getquestionById = function(id, callback) {
	question.findById(id, callback);
}

module.exports.getquestionByquestionGroup = function(question_group, callback) {
	var questionsize = 50;
	var query = {
		group: question_group
	};
	question.find(query, callback).limit(questionsize);
}
module.exports.addquestion = function(_question, callback) {
	question.create(_question, callback);
}
module.exports.updatequestion = function(id, _question, options, callback) {
	console.log("id " + id);
	var newId;

	newId = new mongoose.Types.ObjectId(id);
	var query = {
		_id: newId
	};
	var update = {
		name: _question.name,
		group: _question.group,
		typequetsion: _question.typequetsion,
		answer: _question.answer,
		note: _question.note
	}
	question.findOneAndUpdate(query, update, options, callback);
}
module.exports.removequestion = function(id, callback) {
	var newId = new mongoose.Types.ObjectId(id);
	var query = {
		_id: newId
	};
	question.remove(query, callback);
}
