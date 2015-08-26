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
			csv()
				.from.stream(fs.createReadStream(__dirname + '/../public/data.txt'))
				//.to.path(__dirname + '/../public/out.csv')

				//行数だけループするっぽい
				.on('record', function(row, index){
					rows.push(row);
				})
				.on('end', function(count){
					console.log('text input is done');
					
					sotsu.insert({_id:'Aug24th-2', _rev:body._rev, data_txt:rows}, function(err, body, header){
						if(err){
							console.log('[sotsu.insert]', err.message);
							return;
						}else{
							console.log('you have changed the Aug24th-2.');
							console.log(body);
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
