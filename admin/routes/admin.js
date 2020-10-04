var express = require('express');
var router = express.Router();
var User = require('../../models/User');
var QuestionGroup = require('../../models/questiongroup');
var Question = require('../../models/question');
var Cauhoi = require('../../models/cauhoi.js');
var Nghe = require('../../models/nghe.js');
/* GET home page. */
var History = require('../../models/history.js');





function allowAdmins(req, res, next) {
  if(req.isAuthenticated())
  {
     if (req.user.isadmin ==true) 
    return next();
   else
  res.redirect('/chonnghe/');
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
router.get('/listuser',allowAdmins, function(req, res) {
	console.log("đã vào đây");
	  User.getUser(10,function(err, user ){
    if(err || user==null){
        res.redirect("/admin");
}
    else
    {
      res.render('listuser',{
          listuser:user,
      });
    }
  });

});



router.get('/listchonnghe',allowAdmins, function(req, res) {
  console.log("đã vào đây");
    User.getUser(10,function(err, user ){
    if(err || user==null){
        res.redirect("/admin");
}
    else
    {
      res.render('listuser',{
          listuser:user,
      });
    }
  });

});


router.get('/listnghe',allowAdmins, function(req, res) {
  console.log("đã vào đây");
    Nghe.getNghe(80,function(err, nghe ){
    if(err || nghe==null){
        res.redirect("/admin");
}
    else
    {
      res.render('listnghe',{
          listnghe:nghe,
      });
    }
  });

});


router.get('/thongtinnghe',allowAdmins, function(req, res) {

Nghe.getNghe(330,function(err,_Nghe){
       if(err || _Nghe==null){
        res.render('thongtinnghe',{
          listcauhoi:null,
          listnghe:null
      });
}
    Cauhoi.getCauHoi(500,function(err, _CauHoi ){
    if(err || _CauHoi==null){
        res.render('thongtinnghe',{
          listcauhoi:null,
          listnghe:_Nghe

      });
}
    else
    {



      res.render('thongtinnghe',{
          listcauhoi:_CauHoi,
          listnghe:_Nghe
      });
    }
  });
});

});


















router.get('/danhsachcauhoi',allowAdmins, function(req, res) {
  console.log("thử");

Nghe.getNghe(330,function(err,_Nghe){
       if(err || _Nghe==null){
        res.render('listcauhoi',{
          listcauhoi:null,
          listnghe:null
      });
}
    Cauhoi.getCauHoi(500,function(err, _CauHoi ){
    if(err || _CauHoi==null){
        res.render('listcauhoi',{
          listcauhoi:null,
          listnghe:_Nghe

      });
}
    else
    {
      res.render('listcauhoi',{
          listcauhoi:_CauHoi,
          listnghe:_Nghe
      });
    }
  });
});
});
router.get('/thietdatcauhoi',allowAdmins, function(req, res) {
  console.log("đã vào đây");
     QuestionGroup.getQuestionGroupsactive(500,function(err, _QuestionGroup ){
          if(err || _QuestionGroup.length==0){
            console.log("LOOIX");
            res.render('thietdatkhaosat',{
          listquestion:null,
          listquestiongroup:null,
          group:""
      });
          }else{

    Question.getquestionByquestionGroup(_QuestionGroup[0]._id,function(err, _Question ){
    if(err || _Question==null){
        res.render("/thietdatkhaosat", { listquestion:_Question, listquestiongroup:_QuestionGroup,
          group:""});
}
    else
    {
      res.render('thietdatkhaosat',{
          listquestion:_Question,
          listquestiongroup:_QuestionGroup,
          group:""
      });
    }

  });

}

  });
});





router.get('/ketquachonghe/:_id', allowAdmins, function(req, res, next) {
    console.log("đã vào đây"+req.params._id);
  User.getUser(5220,function(err,_user){
    if(err || _user==null)
    res.render('index', { title: 'huy',listlichsu:null,listuser:null });

History.getHistoryByUser(req.params._id,function(err,data){
if(err || data==null){
    res.render('index', { title: 'huy',listlichsu:null ,listuser:null});
  }
  else{

  res.render('index', { title: 'huy',listlichsu:data ,listuser:_user});
  }
})
})
});



router.get('/thietdatcauhoi/:group',allowAdmins, function(req, res) {
  console.log("đã vào đây"+req.params.group);
 QuestionGroup.getQuestionGroupsactive(500,function(err, _QuestionGroup ){

       if(_QuestionGroup!=null)

    Question.getquestionByquestionGroup(req.params.group,function(err, _Question ){
    if(err || _Question==null){
        res.render("thietdatkhaosat", {  listquestion:_Question,
          listquestiongroup:_QuestionGroup,
          group:req.params.group});
}
    else
    {
      res.render('thietdatkhaosat',{
          listquestion:_Question,
          listquestiongroup:_QuestionGroup,
          group:req.params.group
      });
    }
  });  }); 
});



module.exports = router;
