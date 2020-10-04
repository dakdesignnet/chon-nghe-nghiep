var express = require('express');
var router = express.Router();

var User = require('../../models/User');
var chonnghejson = require('../../models/chonnghejson');
var History = require('../../models/history.js');
/* GET home page. */
router.get('/admin', allowAdmins, function(req, res, next) {
  User.getUser(5220,function(err,_user){
    if(err || _user==null)
    res.render('index', { title: 'huy',listlichsu:null,listuser:null });

History.getHistory(5220,function(err,data){
if(err || data==null){
    res.render('index', { title: 'huy',listlichsu:null ,listuser:null});
  }
  else{

  res.render('index', { title: 'huy',listlichsu:data ,listuser:_user});
  }
})
})
});



function allowAdmins(req, res, next) {
  if(req.isAuthenticated())
  {
     if (req.user.isadmin ==true) 
    return next();
   else
  res.redirect('/');
  }
  res.redirect('/users/login');
}

function allowRegular(req, res, next) {
  if (req.user.role === 'Regular') return next();
  res.redirect('/admin-login');
}



function isAuthenticated(req, res, next) {
	if(req.isAuthenticated())
	{
		return next();
	}
	res.redirect('/users/login');
}

module.exports = router;
