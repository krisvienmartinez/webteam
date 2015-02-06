
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs=require('fs');
var mongoose=require('mongoose');

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

//dbase
mongoose.connect('mongodb://admin:admin@ds041831.mongolab.com:41831/trailrush');

var EventSchema = new mongoose.Schema({
	 _id: String
	,EventName: String
	,EventDate: String
	,EventPlace: String
	,EventOrganizer: String
	,eventDescription: String

});

var MyEvents=mongoose.model('MyEvents', EventSchema);

app.param('EventName', function(req, res, next, EventName){
	MyEvents.find({EventName: EventName}, function(err,docs){
		req.MyEvent = docs[0];
		next();
	});
	});

//show all events
app.get("/Events", function(req,res){
 MyEvents.find({}, function (err, docs){
 res.render('users/events', {users: docs});
 });
});

//Show specific event
app.get('/Events/:EventName', function (req, res){
	res.render('users/show', { MyEvent: req.MyEvent});
});

/*app.get('/', routes.index);
app.get('/users', user.list);*/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

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
//searching
app.post("/SearchEvent", function(req,res){
 MyEvents.find({'EventName':req.body.SearchEvent}, function (err, docs){
 res.render('users/search', {users: docs});
 });
});