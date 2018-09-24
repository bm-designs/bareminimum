var express = require('express');
var router = express.Router();
var app = express();
var util = require('util');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
var cookieParser = require('cookie-parser');
app.use(cookieParser());


// router.post('/process-payment', function(req,res,next){
// 	var request_params = req.body;
// 	console.log(req);

// 	console.log(req.body);
// 	debugger;
// 	var idempotency_key = require('crypto').randomBytes(64).toString('hex');

// 	// Charge the customer's card
// 	var transactions_api = new squareConnect.TransactionsApi();
// 	var request_body = {
// 		card_nonce: req.nonce,
// 		locationId: app.squareLocationId,
// 		amount_money: {
// 			amount: 100, // $1.00 charge
// 			currency: 'USD'
// 		},
// 		idempotency_key: idempotency_key
// 	};
// 	transactions_api.charge(app.squareLocationId, request_body).then(function(data) {
// 		console.log(util.inspect(data, false, null));
// 		res.render('process-payment', {
// 			'title': 'Payment Successful',
// 			'result': "Payment Successful (see console for transaction output)"
// 		});
// 	}, function(error) {
// 		console.log(util.inspect(error.status, false, null));
// 		res.render('process-payment', {
// 			'title': 'Payment Failure',
// 			'result': "Payment Failed (see console for error output)"
// 		});
// 	});

// });

module.exports = router;