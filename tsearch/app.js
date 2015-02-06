
/**
 * Module dependencies.
 */

var express = require('express')
var routes = require('./routes');
var http = require('http');
var fs = require('fs');
var mongoose = require('mongoose');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});
//mongoose
mongoose.connect('mongodb://taxi:taxi1@ds031641.mongolab.com:31641/mydatabase');
var Schema = new mongoose.Schema({
 date: Date,
 platenumber: String,
 comment: String
}),
	user = mongoose.model('emp', Schema);

//searching to
app.post("/users/bibid", function(req,res){
 user.find({"bibid":req.body.searchbibid}, function (err, docs){
 res.render('users/seach', {users: docs});
 });
});

//shows the entry
app.get('/users/:bibid', function (req, res){
	res.render('users/show', { user: req.user});
});


//html
app.get('/search', function(req, res) {
fs.readFile('./search.html', function(error, content) {
if (error) {
 res.writeHead(500);
 res.end();
 }
 else {
 res.writeHead(200, { 'Content-Type': 'text/html' });
 res.end(content, 'utf-8');
 }
 });
});

// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
