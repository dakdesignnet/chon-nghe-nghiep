var mongoose = require('mongoose');
var chema = mongoose.Schema;
ObjectID = require('mongoose').ObjectID;
var mySchema = mongoose.Schema({
	iduser: {
		type: String,
			require: true
	},
	tenuser: {
		type:String,require:true
	},
	
	nghe: {
		type:Array,require:true
	},
	
		
	
	ghichu: {
		type: String,require:false
	}
});

var History = module.exports = mongoose.model('lichsu', mySchema);

module.exports.getHistory = function(limitHistory, callback) {
	History.find(callback).limit(limitHistory);
}
module.exports.getHistoryById = function(id, callback) {
	History.findById(id, callback);
}


module.exports.getHistoryByUser = function(_id, callback) {
	var questionsize = 70;
	var query = {
		iduser: _id
	};
	History.find(query, callback).limit(questionsize);
}
module.exports.addHistory = function(_History, callback) {
	History.create(_History, callback);
}
module.exports.updateHistory = function(id, _History, options, callback) {
	console.log("id " + id);
	var newId;

	newId = new mongoose.Types.ObjectId(id);
	var query = {
		_id: newId
	};
	var update = {
		iduser: _History.iduser,
		nghe: _History.nghe,
		ghichu: _History.ghichu
	}
	History.findOneAndUpdate(query, update, options, callback);
}
module.exports.removeHistory = function(id, callback) {
	var newId = new mongoose.Types.ObjectId(id);
	var query = {
		_id: newId
	};
	History.remove(query, callback);
}
