var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/data', function(req, res, next) {
	csv()
		.from.stream(fs.createReadStream(__dirname + '/public/data.csv'))
		.to.path(__dirname + '/public/out.csv')
		.on('record', function(row, index){
			console.log('#' + index + ' ' + JSON.stringify(row));
		});
	res.render('index', { title: 'data input' });
});

module.exports = router;
