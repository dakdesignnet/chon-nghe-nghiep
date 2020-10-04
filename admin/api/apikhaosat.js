var express = require('express');
var app = express();
var Khaosat = require('../../models/khaosat');
var User = require('../../models/User');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})
app.get('/api/khaosat', isAuthenticated, function(req, res) {
  Khaosat.getKhaosat(11535, function(err, _Khaosat) {
    if (err)
      throw err;
    res.json(_Khaosat);
  });
});
app.get('/api/pagekhaosat/:li', isAuthenticated, function(req, res) {
  Khaosat.getKhaosat(req.params.li, function(err, _Khaosat) {
    if (err)
      throw err;
    res.json(_Khaosat);
  });
});
app.get('/api/khaosat/:id/:idgroup/:limit', isAuthenticated, function(req, res) {
  Khaosat.getKhaosatByUser(req.params.id, req.params.idgroup, req.params.limit, function(err, _Khaosat) {
    if (err)
      throw err;
    res.json(_Khaosat);
  });
});
app.get('/api/khaosatadmin/:idgroup/:limit', isAuthenticated, function(req, res) {
  Khaosat.getKhaosatByAdmin(req.params.idgroup, req.params.limit, function(err, _Khaosat) {
    if (err)
      throw err;
    res.json(_Khaosat);
  });
});

app.get('/api/khaosat/:idgroup/:limit', isAuthenticated, function(req, res) {
  Khaosat.getKhaosatByUser(req.user._id, req.params.idgroup, req.params.limit, function(err, _Khaosat) {
    if (err)
      throw err;
    res.json(_Khaosat);
  });
});



app.get('/api/khaosat/:_id', isAuthenticated, function(req, res) {
  Khaosat.getKhaosatById(req.params._id, function(err, _Khaosat) {
    if (err)
      throw err;
    res.json(_Khaosat);
  });
});

app.post('/api/khaosat', urlencodedParser, isAuthenticated, function(req, res) {
if(JSON.parse(req.body.dulieu).cmndkhongtrung==""||JSON.parse(req.body.dulieu).cmndkhongtrung==null){
  console.log("tại sao");
  res.send("cmndtrung");
  }else{
 
   Khaosat.addKhaosatkhongtrung(JSON.parse(req.body.dulieu), function(err, _Khaosat) {
      console.log("tại sao vậy");
    if (err)
      res.sent("loi");
    res.json(_Khaosat);
  })
}

  
 ;
});



// kiểm tra
app.put('/api/khaosat/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;

      var jsondata = JSON.parse(req.body.dulieu);
    console.log("thêm mới");
  
    Khaosat.addKhaosatkhongtrung(JSON.parse(req.body), function(err, _Khaosat) {
      if (err)
        res.sent("loi");
      res.json(_Khaosat);
    });
});


app.post('/api/updatekhaosat/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;

  console.log("update Khaosat" + id);

  Khaosat.updateKhaosat(id, req.body, {}, function(err, _Khaosat) {
    if (err)
      throw err;
    res.json(_Khaosat);
  });
});

app.delete('/api/khaosat/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;
  Khaosat.removeKhaosat(id, function(err, _Khaosat) {
    if (err)
      throw err;
    res.json(_Khaosat);
  });
});
app.post('/api/removekhaosat/:_id', allowAdmins, function(req, res) {
  var id = req.params._id;
  Khaosat.removeKhaosat(id, function(err, _Khaosat) {
    if (err) {
      throw err;
      console.log("loi--" + err);
    }
    res.json(_Khaosat);
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



module.exports = app;