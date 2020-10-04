var mongoose = require('mongoose');
var chema = mongoose.Schema;
ObjectID = require('mongoose').ObjectID;
var mySchema = mongoose.Schema({
			username: {
				type: String,
				require: true
			},
			idusername: {
				type: String,
				require: true
			},
			create_day: {
				type: String,
				default: "không rõ"
			},
			group: {
				type: String,
				require: true
			},
			cmndkhongtrung:{type:String,requiue:true},
				sdtkhongtrung:{type:String,requiue:false},
			data: {
				type: [{typequetsion:String, name:String,value:String}],
				require: true  
				},

				note: {
					type: String
				}
			});

		var Khaosat = module.exports = mongoose.model('khaosat', mySchema);

		module.exports.getKhaosat = function(limitKhaosat, callback) {
			Khaosat.find(callback).limit(limitKhaosat);
		}
		module.exports.getKhaosatById = function(id, callback) {
			Khaosat.findById(id, callback);
		}

		module.exports.getKhaosatByUser = function(_idusername,_idgroup,Khaosatsize, callback) {
			var query = {
				idusername: _idusername,
				group:_idgroup
			};
			var limitc=1000;
			 limitc=parseInt(Khaosatsize);
			if(limitc>0)
				limitc=limitc;
				else
					limitc=100;
			Khaosat.find(query, callback).limit(limitc);
		}


		module.exports.getKhaosatByAdmin = function(_idgroup, callback) {
			var query = {
				group:_idgroup
			};
			
			Khaosat.find(query, callback);
		}


		module.exports.geAlltKhaosatByUser = function(_idusername,Khaosatsize, callback) {
			var query = {
				idusername: _idusername
			};
			var limitc=100;
			 limitc=parseInt(Khaosatsize);
			if(limitc>0)
				limitc=limitc;
				else
					limitc=100;
			Khaosat.find(query, callback).limit(limitc);
		}
		module.exports.addKhaosat = function(_Khaosat, callback) {
			console.log("đã vào đây khaosat");
			Khaosat.create(_Khaosat, callback);
		}
		module.exports.updateKhaosat = function(id, _Khaosat, options, callback) {
			console.log("id " + id);
			var newId;

			newId = new mongoose.Types.ObjectId(id);
			var query = {
				_id: id
			};
			var update = {
				username: _Khaosat.name,
				idusername: _Khaosat.idusername,
				create_day: _Khaosat.create_day,
				group: _Khaosat.group,
				data: _Khaosat.data,

				note: _Khaosat.note
			}
			Khaosat.findOneAndUpdate(query, update, options, callback);
		}
		module.exports.removeKhaosat = function(id, callback) {
			var newId = new mongoose.Types.ObjectId(id);
			var query = {
				_id: newId
			};
			Khaosat.remove(query, callback);
		}

		

			module.exports.addKhaosatkhongtrung = function(_Khaosat, _callback) {

Khaosat.create(_Khaosat, _callback);
			
		}