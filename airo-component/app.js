require('dotenv').config
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var casefanRouter = require('./routes/casefan');
var caseRouter = require('./routes/case');
var coolerRouter = require('./routes/cooler');
var cpuRouter = require('./routes/cpu');
var moboRouter = require('./routes/mobo');
var powersupplyrouter = require('./routes/powersupply');
var ramrouter = require('./routes/ram');
var storagerouter = require('./routes/storage');
var gpurouter = require('./routes/gpu');
var articlerouter = require('./routes/article')



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/casefan', casefanRouter);
app.use('/case', caseRouter);
app.use('/cooler', coolerRouter);
app.use('/cpu', cpuRouter);
app.use('/gpu', gpurouter);
app.use('/motherboard', moboRouter);
app.use('/powersupply', powersupplyrouter);
app.use('/ram', ramrouter);
app.use('/storage', storagerouter);
app.use('/article', articlerouter);

module.exports = app;
