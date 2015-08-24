var express = require('express');
var router = express.Router();

//追加モジュール
var csv = require('csv');
var fs = require('fs');
var nano = require('nano')('http://localhost:5984');
var db = require('nano')('http://localhost:5984/sotsu');
var sotsu = nano.use('sotsu');
var assert = require('assert');

/* GET users listing. */
router.get('/', function(req, res, next) {
	//res.send('data input');
	//DBに書き込む内容をためこむやーつ
	var rows = [];
	var rev;
	var id;

	db.get('Aug24th-2', function(err, body){
		if(!err){
			//console.log(body);
			//console.log(body._rev);
			//console.log(body._id);
			id = body._id;
			rev = "'"+body._rev+"'";
			console.log(id);
			console.log(rev);
		}else{
			console.log('it has err');
			console.log(err);
		}
	});
	
	csv()
		.from.stream(fs.createReadStream(__dirname + '/../public/data.txt'))
		//.to.path(__dirname + '/../public/out.csv')

		//行数だけループするっぽい
		.on('record', function(row, index){
			rows.push(row);
		})
		.on('end', function(count){
			console.log('done');
			
			sotsu.insert({_id:'Aug24th-2', _rev:'2-8735279bea13b8b26e62cd5e71e8d3b2', data_txt:'がっこうぐらし'},  function(err, body, header){
				if(err){
					console.log('[sotsu.insert]', err.message);
					return;
				}
				console.log('you have changed the Aug24th-3.');
				console.log(body);
			});
			
		});
});

module.exports = router;
