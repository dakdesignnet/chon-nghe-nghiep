var express = require('express');
var app = express();
var chonnghejson = require('../../models/chonnghejson');
var User = require('../../models/User');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})
app.get('/api/chonnghejson', isAuthenticated, function(req, res) {
  chonnghejson.getChonnghejson(11535, function(err, _chonnghejson) {
    if (err)
      throw err;
    console.log("chuyện gì vâyh");
    res.json(JSON.parse(_chonnghejson[0].data));
  });
});
app.get('/api/pagechonnghejson/:li', isAuthenticated, function(req, res) {
  chonnghejson.getChonnghejson(req.params.li, function(err, _chonnghejson) {
    if (err)
      throw err;
    res.json(_chonnghejson);
  });
});






app.get('/api/chonnghejson/:_id', isAuthenticated, function(req, res) {
  chonnghejson.getChonnghejsonById(req.params._id, function(err, _chonnghejson) {
    if (err)
      throw err;
    res.json(_chonnghejson);
  });
});


app.post('/api/chonnghejson', urlencodedParser, isAuthenticated, function(req, res) {
   console.log("tại sao 3333");
if(req.body==null){
  console.log("tại sao");
  res.send("datanull");
  }else{
   console.log("tại sao 333333333333");
   chonnghejson.addChonnghejson(req.body, function(err, _chonnghejson) {
      console.log("tại sao vậy");
    if (err)
      res.sent("loi");
    res.json(_chonnghejson);
  })
}

  
 ;
});



// kiểm tra
app.put('/api/chonnghejson/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;

      var jsondata = JSON.parse(req.body.dulieu);
    console.log("thêm mới");
  
    chonnghejson.addchonnghejsonkhongtrung(JSON.parse(req.body), function(err, _chonnghejson) {
      if (err)
        res.sent("loi");
      res.json(_chonnghejson);
    });
});


app.post('/api/updatechonnghejson/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;

  console.log("update chonnghejson" +id);

  chonnghejson.updateChonnghejson(id, req.body, {}, function(err, _chonnghejson) {
    if (err)
      throw err;
    res.json(_chonnghejson);
  });
});

app.delete('/api/chonnghejson/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;
  chonnghejson.removechonnghejson(id, function(err, _chonnghejson) {
    if (err)
      throw err;
    res.json(_chonnghejson);
  });
});
app.post('/api/removechonnghejson/:_id', allowAdmins, function(req, res) {
  var id = req.params._id;
  chonnghejson.removechonnghejson(id, function(err, _chonnghejson) {
    if (err) {
      throw err;
      console.log("loi--" + err);
    }
    res.json(_chonnghejson);
  });
});

function allowAdmins(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.isadmin == true)
      return next();
    else
      res.redirect('/nhanvien/');
  }
  res.redirect('/users/login');
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login');
}



app.post('/api/app/chonnghejson', urlencodedParser,function(req, res) {
  User.checkuser(req.body.username, req.body.pass, function(err, _user) {
    if (err || _user == null)
      throw err;
    if (_user != null)
      chonnghejson.getchonnghejson(11535, function(err, _chonnghejson) {
        if (err)
         res.sent("datanull");
        res.json(_chonnghejson);
      });
  });
});



app.post('/api/app/addchonnghejson', urlencodedParser, function(req, res) {

  User.checkuser(req.body.username, req.body.pass, function(err, _user) {
    if (err || _user == null)
      throw err;
    if (_user != null)
      var jsondata = JSON.parse(req.body.dulieu);
    console.log("thêm mới");
 
    
  if(JSON.parse(req.body.dulieu).cmndkhongtrung==""||JSON.parse(req.body.dulieu).cmndkhongtrung==null ){
  res.send("cmndsai");
  }else
    chonnghejson.addchonnghejsonkhongtrung(JSON.parse(req.body.dulieu), function(err, _chonnghejson) {
      if (err)
        res.sent("loi");
      console.log(_chonnghejson);
      res.json(_chonnghejson);
    });
  });
});


module.exports = app;