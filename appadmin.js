var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var session = require('express-session');
// after session
var flash = require('connect-flash');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var index = require('./admin/routes/index');
var apinghe = require('./admin/api/apinghe.js');
var apicauhoi = require('./admin/api/apicauhoi.js');

var users = require('./admin/routes/users');
var nguoidung = require('./admin/routes/nguoidung');
var admin = require('./admin/routes/admin');
var apiuser = require('./admin/api/apiuser');
var apihistory= require('./admin/api/apihistory.js');

var apichonnghejson= require('./admin/api/apichonnghejson');
var app = express();
mongoose.connect('mongodb://localhost:27017/chonnghe');
var dbMongo = mongoose.connection;
dbMongo.on('error', function() {
	console.log('Connect error -------------');
	mongoose.connect('mongodb://localhost:27017/chonnghe');
});
dbMongo.once('open', function() {
	console.log('Connected to  localhost');
});
require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, './admin/views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, './admin/public', 'favicon.ico')));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './admin/public')));

app.use(session({
	secret: "secret",
	resave: true,
	saveUninitialized: true
}));

// after session use
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
	customValidators: {
		returnFalse: function() {
			return false;
		}
	}
}));
app.use('/admin', admin);
app.use('/', nguoidung);
app.use('/', index);
app.use('/users', users);
app.use( apinghe);
app.use( apicauhoi);
app.use(apiuser);
app.use(apihistory);
app.use(apichonnghejson);
app.use('/admin', admin);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;