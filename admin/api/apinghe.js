var express = require('express');
var app = express();
var Nghe = require('../../models/nghe');
var User = require('../../models/User');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})
app.get('/api/nghe', isAuthenticated, function(req, res) {
  Nghe.getNghe(15, function(err, _Nghe) {
    if (err)
      throw err;
    res.json(_Nghe);
  });
});
app.get('/api/nghe/:_id', isAuthenticated, function(req, res) {
  Nghe.getNgheById(req.params._id, function(err, _Nghe) {
    if (err)
      throw err;
    res.json(_Nghe);
  });
});
app.get('/api/nghe/bygroup/:_id', isAuthenticated, function(req, res) {
  Nghe.getNgheByNgheGroup(req.params._id, function(err, _Nghe) {
    if (err)
      throw err;
    res.json(_Nghe);
  });
});

app.post('/api/nghe', urlencodedParser, allowAdmins, function(req, res) {
  console.log("thêm mới");

  Nghe.addNghe(req.body, function(err, _Nghe) {
    if (err)
      res.sent("loi");
    res.json(_Nghe);
  });
});
app.put('/api/nghe/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;

  Nghe.updateNghe(id, req.body, {}, function(err, _Nghe) {
    if (err)
      throw err;
    res.json(_Nghe);
  });
});


app.post('/api/nghe/update/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;

  console.log("update Nghe" + id);

  Nghe.updateNghe(id, req.body, {}, function(err, _Nghe) {
    if (err)
      throw err;
    res.json(_Nghe);
  });
});

app.delete('/api/nghe/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;
  Nghe.removeNghe(id, function(err, _Nghe) {
    if (err)
      throw err;
    res.json(_Nghe);
  });
});
app.post('/api/nghe/remove/:_id', allowAdmins, function(req, res) {
  var id = req.params._id;
  Nghe.removeNghe(id, function(err, _Nghe) {
    if (err) {
      throw err;
      console.log("loi--" + err);
    }
    res.json(_Nghe);
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