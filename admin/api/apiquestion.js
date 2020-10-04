var express = require('express');
var app = express();
var question = require('../../models/question');
var User = require('../../models/User');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})
app.get('/api/question', isAuthenticated, function(req, res) {
  question.getQuestion(15, function(err, _question) {
    if (err)
      throw err;
    res.json(_question);
  });
});
app.get('/api/question/:_id', isAuthenticated, function(req, res) {
  question.getquestionById(req.params._id, function(err, _question) {
    if (err)
      throw err;
    res.json(_question);
  });
});
app.get('/api/questionbygroup/:_id', isAuthenticated, function(req, res) {
  question.getquestionByquestionGroup(req.params._id, function(err, _question) {
    if (err)
      throw err;
    res.json(_question);
  });
});

app.post('/api/question', urlencodedParser, allowAdmins, function(req, res) {
  console.log("thêm mới");

  question.addquestion(req.body, function(err, _question) {
    if (err)
      res.sent("loi");
    res.json(_question);
  });
});
app.put('/api/question/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;

  question.updatequestion(id, req.body, {}, function(err, _question) {
    if (err)
      throw err;
    res.json(_question);
  });
});


app.post('/api/updatequestion/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;

  console.log("update question" + id);

  question.updatequestion(id, req.body, {}, function(err, _question) {
    if (err)
      throw err;
    res.json(_question);
  });
});

app.delete('/api/question/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;
  question.removequestion(id, function(err, _question) {
    if (err)
      throw err;
    res.json(_question);
  });
});
app.post('/api/removequestion/:_id', allowAdmins, function(req, res) {
  var id = req.params._id;
  question.removequestion(id, function(err, _question) {
    if (err) {
      throw err;
      console.log("loi--" + err);
    }
    res.json(_question);
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