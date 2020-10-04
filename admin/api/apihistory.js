var express = require('express');
var app = express();
var History = require('../../models/history');
var User = require('../../models/User');
var bodyParser = require('body-parser');
 var fs         = require('fs');

var multipart  = require('connect-multiparty');
var multipartMiddleware = multipart();

var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
  
app.get('/api/history', isAuthenticated, function(req, res) {
  History.getHistory(15, function(err, _History) {
    if (err)
      throw err;
    res.json(_History);
  });
});
app.get('/api/history/:_id', isAuthenticated, function(req, res) {
  History.getHistoryById(req.params._id, function(err, _History) {
    if (err)
      throw err;
    res.json(_History);
  });
});
app.get('/api/history/bygroup/:_id', isAuthenticated, function(req, res) {
  History.getHistoryByHistoryGroup(req.params._id, function(err, _History) {
    if (err)
      throw err;
    res.json(_History);
  });
});

// app.post('/api/history', urlencodedParser, allowAdmins, function(req, res) {
//   console.log("thêm mới");

//   History.addHistory(req.body, function(err, _History) {
//     if (err)
//       res.sent("loi");
//     res.json(_History);
//   });
// });

  app.post('/api/history',urlencodedParser,isAuthenticated,function(req,res){
     var clienuser = req.user;
     console.log(req.body);
  
var tam=req.body;
  tam.iduser=clienuser._id;
    tam.tenuser=clienuser.name;
var bientam= JSON.parse(req.body.nghe).listkq;
tam.nghe=bientam;
    History.addHistory(tam,function(err,_history){
        if (err)
      throw err;
    console.log("thêm history thành công");
            res.json(_history);
        
    });
  });



app.put('/api/history/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;

  History.updateHistory(id, req.body, {}, function(err, _History) {
    if (err)
      throw err;
    res.json(_History);
  });
});


app.post('/api/history/update/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;

  console.log("update History" + id);

  History.updateHistory(id, req.body, {}, function(err, _History) {
    if (err)
      throw err;
    res.json(_History);
  });
});

app.delete('/api/history/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;
  History.removeHistory(id, function(err, _History) {
    if (err)
      throw err;
    res.json(_History);
  });
});
app.post('/api/history/remove/:_id', allowAdmins, function(req, res) {
  var id = req.params._id;
  History.removeHistory(id, function(err, _History) {
    if (err) {
      throw err;
      console.log("loi--" + err);
    }
    res.json(_History);
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