var express = require('express');
var router = express.Router();
var csv = require('csv');
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
	//res.send('data input');
	csv()
		.from.stream(fs.createReadStream(__dirname + '/../public/data.csv'))
		.to.path(__dirname + '/../public/out.csv')
		.on('record', function(row, index){
			console.log('done')
		});
});

module.exports = router;
