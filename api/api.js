var express = require('express');
var app = express();



var news=require('./apiNews');
app.use(news);
// var NewsGroup=require('./apiNewsGroup');
// app.use(NewsGroup);

// var page=require('./apiPage');
// app.use(page);

module.exports = app;