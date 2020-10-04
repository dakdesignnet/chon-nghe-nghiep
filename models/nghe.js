var mongoose = require('mongoose');
var chema = mongoose.Schema;
ObjectID = require('mongoose').ObjectID;
var mySchema = mongoose.Schema({
	ten: {
		type: String,
			require: true
	},
	noidung: {
		type: String
	},
	anh: {
		type: String
	
	},
	
	ghichu: {
		type: String
	}
});

var Nghe = module.exports = mongoose.model('nghe', mySchema);

module.exports.getNghe = function(limitNghe, callback) {
	Nghe.find(callback).limit(limitNghe);
}
module.exports.getNgheById = function(id, callback) {
	Nghe.findById(id, callback);
}


module.exports.addNghe = function(_Nghe, callback) {
	Nghe.create(_Nghe, callback);
}
module.exports.updateNghe = function(id, _Nghe, options, callback) {
	console.log("id " + id);
	var newId;

	newId = new mongoose.Types.ObjectId(id);
	var query = {
		_id: newId
	};
	var update = {
		ten: _Nghe.ten,
		noidung: _Nghe.noidung,
		anh: _Nghe.anh,
		ghichu: _Nghe.ghichu,
	}
	Nghe.findOneAndUpdate(query, update, options, callback);
}
module.exports.removeNghe = function(id, callback) {
	var newId = new mongoose.Types.ObjectId(id);
	var query = {
		_id: newId
	};
	Nghe.remove(query, callback);
}
