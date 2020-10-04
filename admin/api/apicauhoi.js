var express = require('express');
var app = express();
var CauHoi = require('../../models/cauhoi');
var User = require('../../models/User');
var bodyParser = require('body-parser');
 var fs         = require('fs');

var multipart  = require('connect-multiparty');
var multipartMiddleware = multipart();

var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
  
app.get('/api/cauhoi', isAuthenticated, function(req, res) {
  CauHoi.getCauHoi(545, function(err, _CauHoi) {
    if (err)
      throw err;
    res.json(_CauHoi);
  });
});
app.get('/api/cauhoi/:_id', isAuthenticated, function(req, res) {
  CauHoi.getCauHoiById(req.params._id, function(err, _CauHoi) {
    if (err)
      throw err;
    res.json(_CauHoi);
  });
});
app.get('/api/cauhoi/bygroup/:_id', isAuthenticated, function(req, res) {
  CauHoi.getCauHoiByCauHoiGroup(req.params._id, function(err, _CauHoi) {
    if (err)
      throw err;
    res.json(_CauHoi);
  });
});

// app.post('/api/cauhoi', urlencodedParser, allowAdmins, function(req, res) {
//   console.log("thêm mới");

//   CauHoi.addCauHoi(req.body, function(err, _CauHoi) {
//     if (err)
//       res.sent("loi");
//     res.json(_CauHoi);
//   });
// });

  app.post('/api/cauhoi',urlencodedParser,multipartMiddleware,allowAdmins,function(req,res){
    console.log("ndfasdfsdè");
      var file = req.files.file;
    // Tên file


   var originalFilename =Date.now() +'-' + file.name ;
    // File type
    var fileType         = file.type.split('/')[1];

    // File size
    var fileSize         = file.size;


   var pathUpload       = "admin/public/images/cauhoi/"+originalFilename;
  var datainsert=req.body;
    console.log(req.body);
    console.log("thúad");
  listdiemnghe=JSON.parse(datainsert.diemnghe);
  var listdn=[];
for (var i = 0; i < datainsert.nghe.length; i++) {
listdn.push({id:datainsert.nghe[i],value:listdiemnghe[i].value});
}


datainsert.nghe=listdn;
console.log("Ádfasdf");
 console.log(JSON.stringify(datainsert));

  datainsert.anh="/images/cauhoi/"+originalFilename;
  

    CauHoi.addCauHoi(datainsert,function(err,_Tranh){
      if(err)
          res.sent("loi");{
    
          fs.readFile(file.path, function(err, data) {
        if(!err) {
            fs.writeFile(pathUpload, data, function() {

                // Return anh vua upload
                console.log("đã thành công")
                var data={ketua:"oke"};
            res.json(_Tranh);
                return;
            });

        }
        else{
          console.log("lỗi");
            res.json(_Tranh);
        }
    });
    }
    });
  });




  app.post('/api/cauhoi/update/:_id',urlencodedParser,multipartMiddleware,allowAdmins,function(req,res){
    var id = req.params._id;

    console.log("<nhuyyhuy></nhuyyhuy>è");
  var datainsert=req.body;
console.log(req);
var 
  listdiemnghe=JSON.parse(datainsert.diemnghe);
  var listdn=[];
for (var i = 0; i < datainsert.nghe.length; i++) {
listdn.push({id:datainsert.nghe[i],value:listdiemnghe[i].value});
}

datainsert.nghe=listdn;
    if(req.files.file!=null){
      var file = req.files.file;
    // Tên file


   var originalFilename =Date.now() +'-' + file.name ;
    // File type
    var fileType         = file.type.split('/')[1];

    // File size
    var fileSize         = file.size;

   var pathUpload       = "admin/public/images/cauhoi/"+originalFilename;
    console.log(req.body);

  datainsert.anh="/images/cauhoi/"+originalFilename;

  console.log("có ảnh mới")
    }
  
    CauHoi.updateCauHoi(id,datainsert,{},function(err,_Tranh){
      if(err)
          res.sent("loi");{
    if(req.files.file!=null){
          fs.readFile(file.path, function(err, data) {
        if(!err) {
            fs.writeFile(pathUpload, data, function() {

                // Return anh vua upload
                console.log("đã thành công")
                var data={ketua:"oke"};
            res.json(_Tranh);
                return;
            });

        }
        else{
          console.log("lỗi");
            res.json(_Tranh);
        }
    });
        }else{
  console.log("không có ảnh")
  console.log("không có ảnh"+ datainsert.anh)

          res.json(_Tranh);
        }
    }
    });
  });





app.put('/api/cauhoi/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;

  CauHoi.updateCauHoi(id, req.body, {}, function(err, _CauHoi) {
    if (err)
      throw err;
    res.json(_CauHoi);
  });
});


// app.post('/api/cauhoi/update/:_id', urlencodedParser, allowAdmins, function(req, res) {
//   var id = req.params._id;

//   console.log("update CauHoi" + id);

//   CauHoi.updateCauHoi(id, req.body, {}, function(err, _CauHoi) {
//     if (err)
//       throw err;
//     res.json(_CauHoi);
//   });
// });

app.delete('/api/cauhoi/:_id', urlencodedParser, allowAdmins, function(req, res) {
  var id = req.params._id;
  CauHoi.removeCauHoi(id, function(err, _CauHoi) {
    if (err)
      throw err;
    res.json(_CauHoi);
  });
});
app.post('/api/cauhoi/remove/:_id', allowAdmins, function(req, res) {
  var id = req.params._id;
  CauHoi.removeCauHoi(id, function(err, _CauHoi) {
    if (err) {
      throw err;
      console.log("loi--" + err);
    }
    res.json(_CauHoi);
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