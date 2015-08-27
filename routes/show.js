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

	db.get('Aug24th-2', function(err, body){
		if(!err){
			//console.log(body);
			var i=0;
			body.data_txt.forEach(function(){
				console.log(body.data_txt[i]);
				i+=1;
			});
		}else{
			console.log('it has err');
			console.log(err);
		}
	});
	/*
	csv()
		.from.stream(fs.createReadStream(__dirname + '/../public/data.csv'))
		//.to.path(__dirname + '/../public/out.csv')

		//行数だけループするっぽい
		.on('record', function(row, index){
			rows.push(row);
			//console.log(row)
			
			sotsu.insert({key:row}, 'Aug24th-2', function(err, body, header){
				if(err){
					console.log('[sotsu.insert]', err.message);
					return;
				}
				console.log('you have inserted the Aug24th.');
				console.log(body);
			});
			
		})
		.on('end', function(count){
			console.log('done');
			sotsu.insert({data:rows}, 'Aug24th-3', function(err, body, header){
				if(err){
					console.log('[sotsu.insert]', err.message);
					return;
				}
				console.log('you have inserted the Aug24th.');
				console.log(body);
			});
			
		});
	*/
	
	
});

module.exports = router;
