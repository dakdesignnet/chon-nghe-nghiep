var express = require('express');
var app = express();
var questiongroup = require('../../models/questiongroup');
 var User = require('../../models/User');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})
app.get('/api/questiongroup', isAuthenticated, function(req, res) {
  console.log("aloooo");
  questiongroup.getQuestionGroups(115, function(err, _questiongroup) {
    if (err)
      throw err;
    res.json(_questiongroup);
  });
});




app.get('/api/questiongroup/:_id', isAuthenticated, function(req, res) {
  questiongroup.getQuestionGroupById(req.params._id, function(err, _questiongroup) {
    if (err)
      throw err;
    res.json(_questiongroup);
  });
});

app.post('/api/questiongroup', urlencodedParser, allowAdmins, function(req, res) {
  console.log("thêm mới questiongroup.js");

  questiongroup.createQuestionGroup(req.body, function(err, _questiongroup) {
    if (err)
      throw err;
    res.json(_questiongroup);
  });
});



app.post('/api/updatequestiongroup/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;

  console.log("update questiongroup" + id);

  questiongroup.updateQuestionGroup(id, req.body, {}, function(err, _questiongroup) {
    if (err)
      throw err;
    res.json(_questiongroup);
  });
});

app.delete('/api/questiongroup/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;
  questiongroup.removeQuestionGroup(id, function(err, _questiongroup) {
    if (err)
      throw err;
    res.json(_questiongroup);
  });
});
app.post('/api/removequestiongroup/:_id', allowAdmins, function(req, res) {
  var id = req.params._id;
  questiongroup.removeQuestionGroup(id, function(err, _questiongroup) {
    if (err) {
      throw err;
      console.log("loi--" + err);
    }
    res.json(_questiongroup);
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
  if(req.isAuthenticated())
  {
    return next();
  }
  res.redirect('/users/login');
}




module.exports = app;