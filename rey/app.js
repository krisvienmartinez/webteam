
/**
 * Module dependencies.
 */

var express = require('express')
var routes = require('./routes');
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
		bibid: a.bibid,
		fname: a.fname,
		location: a.location,
		event: a.event,
		age: a.age,
		gender: a.gender
}),
	user = mongoose.model('emp', Schema);

app.post('/users',function(req,res){
	var a = req.body;
	new user({
		bibid: a.bibid,
		fname: a.fname,
		location: a.location,
		event: a.event,
		age: a.age,
		gender: a.gender

	}).save(function (err, user){
		if(err) res.json(err);
		res.redirect('/users/' + user.platenumber);
	});
});


// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
