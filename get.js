var nano = require('nano')('http://localhost:5984');
var db = require('nano')('http://localhost:5984/sotsu');
var sotsu = nano.use('sotsu');
var assert = require('assert');

/*
sotsu.get('Aug24th-2', {revs_info:true}, function(err, body){
	if(!err)
		console.log(body);
	else
		console.log(err);
});
*/

db.fetch('Aug24th-3', function(err, body){
	console.log(body);
});
