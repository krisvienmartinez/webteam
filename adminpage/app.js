var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var autoIncrement = require('mongoose-auto-increment');
// var connection = mongoose.createConnection("mongodb://john:john@ds031561.mongolab.com:31561/trailrush");
// autoIncrement.initialize(connection);



// var RunnerSchema = new Schema({
// Name: String,
// Age : String
// });
// RunnerSchema.plugin(autoIncrement.plugin, {
// model: 'Runners',
// field: 'bib',
// startAt: 1000,
// incrementBy: 1
// });




// Database
var mongo = require('mongoskin');


var db = mongo.db("mongodb://john:john@ds031561.mongolab.com:31561/trailrush", {native_parser:true});

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});
app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



//for QR
// app.js

// app.get('/routes', function (req, res) {
//   res.render({
//     scripts: ['/javascripts/qrcode.js', '/javascripts/jquery.min.js']
//   }
// }

module.exports = app;
// module.exports=mongoose;
// module.exports=Schema;