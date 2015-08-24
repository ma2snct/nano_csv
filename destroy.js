var nano = require('nano')('http://localhost:5984');
var db = require('nano')('http://localhost:5984/sotsu');
var sotsu = nano.use('sotsu');
var assert = require('assert');

sotsu.destroy('Aug24th-3', '3-84884463c5956f170cd77bd157f94636', function(err, body){
	if(!err)
		console.log(body);
	else
		console.log(err);
});
