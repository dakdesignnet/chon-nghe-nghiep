var express = require('express');
var app = express();
  var User=require('../../models/User');
  var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
  app.get('/api/user',allowAdmins,function(req,res){
    User.getUser(15,function(err,User){
      if(err)
        throw err;
      res.json(User);
    });
  });
  app.get('/api/user/:_id',allowAdmins, function(req, res){
    User.getUserById(req.params._id, function(err, _User){
      if(err)
        throw err;
      res.json(_User);
    });
  });

  app.post('/api/user',urlencodedParser,allowAdmins,function(req,res){
    console.log(req.body.name +"đã vào tới đây rồi");
  
    User.createUser(req.body,function(err,_User){
      if(err)
        throw err;
      res.json(_User);
    });
  });
  app.put('/api/user/:_id',urlencodedParser,allowAdmins,function(req,res){
    var id=req.params._id;
 
    User.updateUser(id,req.body,{},function(err,_User){
      if(err)
        throw err;
      res.json(_User);
    });
  });


    app.post('/api/updateuser/:_id',urlencodedParser,allowAdmins,function(req,res){
    var id=req.params._id;

console.log("update user"+id);

    User.updateUser(id,req.body,{},function(err,_User){
      if(err)
        throw err;
      res.json(_User);
    });
  });

  app.delete('/api/user/:_id',urlencodedParser,allowAdmins,function(req,res){
    var id=req.params._id;
    User.removeUser(id,function(err,_User){
      if(err)
        throw err;
      res.json(_User);
    });
  });
 app.post('/api/removeUser/:_id',allowAdmins,function(req,res){
    var id=req.params._id;
    User.removeUser(id,function(err,_User){
      if(err){
        throw err;
        console.log("loi--"+err);
      }
      res.json(_User);
    });
  });

function allowAdmins(req, res, next) {
  if(req.isAuthenticated())
  {
     if (req.user.isadmin ==true) 
    return next();
   else
  res.redirect('/nhanvien/');
  }
  res.redirect('/users/login');
}
// đăng nhập app 


    app.post('/api/app/login',urlencodedParser,function(req,res){
   

    User.loginapp(req.body.username,req.body.pass,function(err,_User){
      if(err)
         res.json(null);
       else
      res.json(_User);
    });
  });




module.exports = app;