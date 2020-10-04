var express = require('express');
var router = express.Router();
var User = require('../../models/User');
var Chonnghejson = require('../../models/chonnghejson');
var Nghe = require('../../models/nghe.js');
var CauHoi = require('../../models/cauhoi.js');

/* GET home page. */



router.get('/favicon.ico', function(req, res) {
  res.send(204);
});
router.get('/', isAuthenticated, function(req, res, next) {

  Nghe.getNghe(300, function(err, _nghe) {
    if (err || _nghe == null)
      res.render('chonnghemoi', {
        title: 'phamhoanghuy',
        listnghe: null,
        listcauhoi:null

      });
    else
        CauHoi.getCauHoi(300, function(err, _CauHoi) {
             if (err || _CauHoi== null)
      res.render('chonnghemoi', {
        title: 'phamhoanghuy',
        listnghe: null,
        listcauhoi:null

      });
    else
      res.render('chonnghemoi', {
        title: 'phamhoanghuy',
        listnghe: _nghe,
        listcauhoi:_CauHoi

      });
        });
  });
});

router.get('/chon-nghe-theo-cach-suy-dien', isAuthenticated, function(req, res, next) {
  console.log("chán đời")
  Chonnghejson.getChonnghejson(1, function(err, _chonnghe) {
    if (err || _chonnghe[0].data == null)
      res.render('chonnghejson', {
        title: 'phamhoanghuy',
        listquestion: null
      });
    else
      res.render('chonnghejson', {
        title: 'phamhoanghuy',
        listquestion: JSON.parse(_chonnghe[0].data)
      });
  });
});
router.get('/chon-nghe-theo-tam-ly-va-nang-luc', isAuthenticated, function(req, res, next) {

  res.render('chonnghetheotamlyvanangluchoctap', {

  });
});
router.get('/chon-nghe-theo-ca-tinh', isAuthenticated, function(req, res, next) {

  res.render('chonnghetheotinhcach', {

  });
});
router.get('/chon-nghe-giao-tiep-hoac-xa-hoi', isAuthenticated, function(req, res, next) {

  res.render('chonnghegiaotiephoacxahoi', {

  });
});
router.get('/nghe-nao-cua-ban', isAuthenticated, function(req, res, next) {

  res.render('nghenaocuaban', {

  });
});
router.get('/chon-nghe-theo-so-thich', isAuthenticated, function(req, res, next) {

  res.render('chonnghetheosothich', {

  });
});

function isAuthenticated(req, res, next) {

  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login');
}



module.exports = router;