var mongoose=require('mongoose');
var chema=mongoose.Schema;
    ObjectID = require('mongoose').ObjectID;
var mySchema=mongoose.Schema({
	meta_title:{type:String},
	short_url:{type:String,require:true},
	create_day:{type:Date,default:Date.now},
	image_url:{type:String,require:true},
	content:{type:String},
		like:{type:String},
			tag:{type:String}
});

var News=module.exports=mongoose.model('news',mySchema);

module.exports.getNews=function(limitnews,callback){
	News.find(callback).limit(limitnews);
}
module.exports.getNewsById=function(id, callback){
	News.findById(id,callback);
}
module.exports.getNewsByUrl=function(_short_url, callback){
var query={short_url:_short_url};
	News.findOne(query,callback);
}

module.exports.getNewsByNewsGroup=function(news_group, callback){
	var newssize=10;
	var query={news_group:news_group};
	News.find(query,callback).limit(newssize);
}
module.exports.addNews=function(news,callback){
	News.create(news,callback);
}
module.exports.updateNews=function(id,news,options,callback){
	console.log("id "+id);
		var newId;

 newId = new mongoose.Types.ObjectId(id);
	var query={_id:id};
	var update={
		short_url:news.short_url,
		create_day:news.create_day,
		image_url:news.image_url,
		content:news.content,
		meta_title:news.meta_title,
			like:news.like,
			tag:news.tag
	}
	News.findOneAndUpdate(query,update,options,callback);
}
module.exports.removeNews=function(id,callback){
	var  newId = new mongoose.Types.ObjectId(id);
	var query={_id:newId};
	News.remove(query,callback);
}