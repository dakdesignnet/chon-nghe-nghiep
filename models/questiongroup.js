
var mongoose=require('mongoose');
//Collection questiongroup
var mySchema=mongoose.Schema({
 	name:{type:String,require:true},
 	create_day:{type:String,default:"Chưa rõ"},
 		kieu:{type:String,default:"dapancung"},
 	active:{type:Boolean,default:true},
 		dapan: {
		type: Array
	},
	note:{type:String}
 });

var questionGroup=module.exports=mongoose.model('questiongroup',mySchema);

//Get Value
module.exports.getQuestionGroupsactive=function(limit,callback){
	var query={active:true};
	questionGroup.find(query,callback).limit(limit);
}
module.exports.getQuestionGroups=function(limit,callback){
	questionGroup.find(callback).limit(limit);
}
//Update Value
module.exports.updateQuestionGroup=function(id,questiongroup,options,callback){
	var newId;

	newId = new mongoose.Types.ObjectId(id);
	var query = {
		_id: newId
	};
	var update={
		name:questiongroup.name,
		note:questiongroup.note,
		dapan:questiongroup.dapan,
		active:questiongroup.active
	}
	questionGroup.findOneAndUpdate(query,update,options,callback);
}
//Create Value
module.exports.createQuestionGroup=function(questiongroup,callback){
	questionGroup.create(questiongroup,callback);
}
module.exports.getQuestionGroupById=function(id, callback){
	questionGroup.findById(id,callback);
}
//Delete Remove Value
module.exports.removeQuestionGroup=function(id,callback){
	var query={_id:id};
	questionGroup.remove(query,callback);
}
