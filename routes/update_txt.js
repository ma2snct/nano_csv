var express = require('express');
var router = express.Router();

//追加モジュール
var csv = require('csv');
var fs = require('fs');
var nano = require('nano')('http://localhost:5984');
var db = require('nano')('http://localhost:5984/sotsu');
var sotsu = nano.use('sotsu');
var assert = require('assert');

var rows = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
	db.get('Aug24th-2', function(err, body){
		if(!err){
			var i=0;
			body.data_txt.forEach(function(){
				rows.push(body.data_txt[i]);
				i = i + 1;
			});
			fs.readFile('./public/data.txt', 'utf-8', function(err, text){
				console.log(err);
				console.log(text);
				rows.push(text);
				sotsu.insert({_id:body._id, _rev:body._rev, data_txt:rows}, function(err, body, header){
					if(!err){
						console.log('text update done');
					}else{
						console.log('err:' + err);
					}
				});
			});
		}else{
			console.log('it has err');
			console.log(err);
		}
	});
});




module.exports = router;
