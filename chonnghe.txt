var mongoose=require('mongoose');
var chema=mongoose.Schema;
    ObjectID = require('mongoose').ObjectID;
var mySchema=mongoose.Schema({
	name:{type:String,require:true},
	create_day:{type:String,require:false},
	data:{type:String,require:true},
	note:{type:String}
	
});

var Chonnghejson=module.exports=mongoose.model('chonnghejson',mySchema);

module.exports.getChonnghejson=function(limitChonnghejson,callback){
	Chonnghejson.find(callback).limit(limitChonnghejson);
}
module.exports.getChonnghejsonById=function(id, callback){
	Chonnghejson.findById(id,callback);
}

module.exports.addChonnghejson=function(_Chonnghejson,callback){
	Chonnghejson.create(_Chonnghejson,callback);
}
module.exports.updateChonnghejson=function(id,_Chonnghejson,options,callback){
	console.log("id ");
		var newId;

 newId = new mongoose.Types.ObjectId(id);
	var query={_id:newId};

	var update={
		create_day:_Chonnghejson.create_day,
		data:_Chonnghejson.data,
		note:_Chonnghejson.note
	}
	Chonnghejson.findOneAndUpdate(query,update,options,callback);
}
module.exports.removeChonnghejson=function(id,callback){
	var  newId = new mongoose.Types.ObjectId(id);
	var query={_id:newId};
	Chonnghejson.remove(query,callback);
}