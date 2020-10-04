var mongoose = require('mongoose');
var chema = mongoose.Schema;
ObjectID = require('mongoose').ObjectID;
var mySchema = mongoose.Schema({
	cauhoi: {
		type: String,
		require: true
	},
	anh: {
		type: String

	},
	nghe: {
		type: Array

	},

	noidung: {
		type: String
	},
	ghichu: {
		type: String
	}
});

var CauHoi = module.exports = mongoose.model('cauhoi', mySchema);

module.exports.getCauHoi = function(limitCauHoi, callback) {
	CauHoi.find(callback).limit(limitCauHoi);
}
module.exports.getCauHoiById = function(id, callback) {
	CauHoi.findById(id, callback);
}


module.exports.addCauHoi = function(_CauHoi, callback) {
	CauHoi.create(_CauHoi, callback);
}
module.exports.updateCauHoi = function(id, _CauHoi, options, callback) {
	console.log("id " + id);
	var newId;

	newId = new mongoose.Types.ObjectId(id);
	var query = {
		_id: newId
	};
	if (_CauHoi.anh == null) {
		var update = {
			cauhoi: _CauHoi.cauhoi,
			nghe: _CauHoi.nghe,
			noidung: _CauHoi.noidung,
			ghichu: _CauHoi.ghichu
		};
	} else {
		var update = {
			cauhoi: _CauHoi.cauhoi,
			anh: _CauHoi.anh,
			nghe: _CauHoi.nghe,
			noidung: _CauHoi.noidung,
			ghichu: _CauHoi.ghichu
		}
	}
	CauHoi.findOneAndUpdate(query, update, options, callback);
}
module.exports.removeCauHoi = function(id, callback) {
	var newId = new mongoose.Types.ObjectId(id);
	var query = {
		_id: newId
	};
	CauHoi.remove(query, callback);
}