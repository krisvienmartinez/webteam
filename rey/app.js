
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

mongoose.connect('mongodb://admin:admin@ds041831.mongolab.com:41831/trailrush');
var Schema = new mongoose.Schema({
		bibid: Number,
		fname: String,
		location: String,
		event: String,
		age: Number,
		gender: String
}),
	Users = mongoose.model('participants', Schema);

	app.get("/users", function (req, res) {
	Users.find({}, function (err, docs) {
		res.render('users/new', { users : docs});
	});
});

app.post('/users',function(req,res){
	var a = req.body;
	new Users({
		bibid: a.bibid,
		fname: a.fname,
		location: a.location,
		event: a.event,
		age: a.age,
		gender: a.gender

	}).save(function (err, users){
		if(err) res.json(err);
		res.redirect('/users/' + users.fname);
	});
});

//show
app.get('/users/:fname', function (req, res) {
	res.render("users/show", { user: req.user });
});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
