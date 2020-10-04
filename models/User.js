var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true,
		require:true
	},
	password: {
		type: String,
		require:true
	},
	name: String,
	email: String,
	isadmin:{type:Boolean,default:false},
});

var User = module.exports = mongoose.model('user', UserSchema);

module.exports.createUser = function(newUser, callback) {
	bcrypt.hash(newUser.password, 10, function(err, hash) {
		if(err) throw err;
		newUser.password = hash;
		newUser.isadmin = false;

		User.create(newUser,callback);
	});
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
	User.findOne({username: username}, callback);
};

module.exports.emailAlreadyExists = function(email, callback){
	
	User.find({ email: email }, function(err, user) {

		if(user.length) {
			callback('Email Already Exists', null);
		} else {

		}

	});

	var person = User.find({email: email});
	if(person) {
		console.log('email found ----', person);
		return true;
	}
	else
		return false;
}

module.exports.existingEmail = function() {
	
}

module.exports.comparePassword = function(password, hash, callback) {

	bcrypt.compare(password, hash, function(err, isMatch) {
		if(err) return callback(err, false);
		return callback(null, isMatch);
	});
}


module.exports.getUser=function(limitUser,callback){
	User.find(callback).limit(limitUser);
}
module.exports.getUserById=function(id, callback){
	User.findById(id,callback);
}
module.exports.getUserByemail=function(_email, callback){
var query={email:_email};
	User.findOne(query,callback);
}



module.exports.updateUser=function(id ,_User,options,callback){
console.log("id "+id);
		var newId;

 newId = new mongoose.Types.ObjectId(id);
	var query={_id:id};
if(_User.password!=""){
	bcrypt.hash(_User.password, 10, function(err, hash) {
			if(err) throw err;

	var update={
		
		password:hash,
		name:_User.name,
		email:_User.email,
		username:_User.username
	}
	User.findOneAndUpdate(query,update,options,callback);
		
		});

}else
{

var update={
		name:_User.name,
		email:_User.email,
	}
User.findOneAndUpdate(query,update,options,callback);

}	
}




module.exports.removeUser=function(id,callback){
	var  newId = new mongoose.Types.ObjectId(id);
	var query={_id:newId};
	User.remove(query,callback);
}
// api app check
module.exports.checkuser=function(_username ,_pass,callback){

		// console.log("usser"+_username+"pass"+_pass);
		User.getUserByUsername(_username, function(err, user) {
			if(err) return callback(err, null);
			if(!user) {
				return callback(err, null);
			}
			bcrypt.compare(_pass, user.password, function(err, isMatch) {
		if(err) return callback(err, null);
        if(!isMatch)
        	return callback(err, null);
        else
		return callback(null, user);
	});
		});

}



	module.exports.loginapp = function(_username,_pass, callback) {
		console.log("usser"+_username+"pass"+_pass);
		User.getUserByUsername(_username, function(err, user) {
			if(err) return callback(err, null);

			if(!user) {
				return callback(err, null);
			}

			bcrypt.compare(_pass, user.password, function(err, isMatch) {
		if(err)  return callback(err, null);
        if(!isMatch)
        	return callback(err, null);
        else
		return callback(null, user);
	});
		});
		}

