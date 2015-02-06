var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

// Connect to cloud database
var username = "fachiz"
var password = "112194";
var address = '@ds039431.mongolab.com:39431/trailrushdbase';
connect();

// Connect to mongo
function connect() {
var url = 'mongodb://' + username + ':' + password + address;
mongoose.connect(url);
}
function disconnect() {mongoose.disconnect()}