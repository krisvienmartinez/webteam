
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var mongoose=require('./lib/db');
var Runner=require('./lib/runner.js');
var mong =require('mongoose')

//
var autoIncrement = require('mongoose-auto-increment');
var connection = mong.createConnection("mongodb://fachiz:112194@ds039431.mongolab.com:39431/trailrushdbase");
autoIncrement.initialize(connection);

var RunnerSchema = new mongoose.Schema({
	Runner: String
	,Age : String
});

RunnerSchema.plugin(autoIncrement.plugin, {
    model: 'Runners',
    field: 'bib',
    startAt: 1000,
    incrementBy: 1
});


var ListofRunners=mongoose.mongoose.model('ListofRunners', RunnerSchema);

function addPost(Runner, Age, callback) {
	var instance = new ListofRunners();
	instance.Runner=Runner;
	instance.Age=Age; 
	instance.save(function (err) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, instance);
		}
	});
}


var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/users', user.list);

//root
//root

app.get('/', function (req, res) {
    res.sendfile('./testfile.html');
});
app.get('/client/jquery.min.js', function (req, res) {
    res.sendfile('./public/javascripts/jquery.min.js');
});
app.get('/client/qrcode.js', function (req, res) {
    res.sendfile('./public/javascripts/qrcode.js');
});

//push data
app.post('/Register', function(req, res) {
//var _id = req.body.Bimp;
var Runners = req.body.Runner;
var Age = req.body.Age;
addPost(Runners, Age, function(err, user) {
if (err) throw err;
ListofRunners.find({"Runner": req.body.Runner},function(err,docs){
		res.render('index', {views: docs});
	});
});
});

app.get("/Register/success", function(req,res){
	identitycounters.find({"model": "Runners"},function(err,docs){
		res.render('index', {views: docs});
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

