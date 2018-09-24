
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');

var util = require('util');
var app = express();
var routes = require("./routes");
app.use(routes);

app.set('view engine', 'pug');
app.set('/views', __dirname+'/views');

app.use(express.static(__dirname + 'public'));
app.use('/public', express.static(__dirname +'/public'));
app.use(cookieParser());
var config = require('./config');
app.use(bodyParser.urlencoded({ extended: false }));
var eatReviews;
var guideReviews; 
var review;
var eatTotalReviews;
var guideTotalReviews

var server = app.listen(process.env.PORT || 8080, function() {
	console.log("lisening on port number %d", server.address().port);
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Bareminimum27"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', function(req, res) {
	var sql = "SELECT COUNT(*) as total FROM reviews.eatingReviews";
	con.query(sql, function(err, result){
		if (err) throw err;
		eatTotalReviews = result[0].total;
		var sql2 = "SELECT COUNT(*) as total2 FROM reviews.guideReviews"
		con.query(sql2, function(err, result){
			if (err) throw err;
			guideTotalReviews = result[0].total2;
			res.render('guides',
			{eatTotalReviews: eatTotalReviews,
				guideTotalReviews:guideTotalReviews});
		});
	});
});

app.get('/', function(req, res) {
	var sql = "SELECT COUNT(*) as total FROM reviews.eatingReviews";
	con.query(sql, function(err, result){
		if (err) throw err;
		eatTotalReviews = result[0].total;
		var sql2 = "SELECT COUNT(*) as total2 FROM reviews.guideReviews"
		con.query(sql2, function(err, result){
			if (err) throw err;
			guideTotalReviews = result[0].total2;
			res.render('guides',
			{eatTotalReviews: eatTotalReviews,
				guideTotalReviews:guideTotalReviews});
		});
	});
});

app.get('/about', function(req, res) {
	var sql = "SELECT COUNT(*) as total FROM reviews.eatingReviews";
	con.query(sql, function(err, result){
		if (err) throw err;
		eatTotalReviews = result[0].total;
		var sql2 = "SELECT COUNT(*) as total2 FROM reviews.guideReviews"
		con.query(sql2, function(err, result){
			if (err) throw err;
			guideTotalReviews = result[0].total2;
			res.render('guides',
			{eatTotalReviews: eatTotalReviews,
				guideTotalReviews:guideTotalReviews});
		});
	});
});

app.get('/apparel', function(req, res) {
	res.render('apparel')
})
	

app.get("/eatingReviews", function(req,res) {
	con.query("SELECT * FROM reviews.eatingReviews", function(err, rows) {
		eatReviews = rows;
		console.log(eatReviews[0]);
		if (err) throw err;
		res.render('eatingReviews', 
		{eatReviews:eatReviews});
	});
	
});

app.get("/guideReviews", function(req,res) {
	con.query("SELECT * FROM reviews.guideReviews", function(err, rows) {
		guideReviews = rows;
		if (err) throw err;
		res.render('guideReviews', 
		{guideReviews:guideReviews});
	});
});
app.post("/processEatingReview", function(req,res) {
	var data = req.body;
	var sql = "INSERT INTO reviews.eatingReviews (Name, Email, Review, Rating) VALUES ?";
	var values = [[data.revieweeName, data.email, data.review, data.rating]];
	con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
	res.render('eatingReviews');
});
app.post("/processGuideReview", function(req,res) {
	var data = req.body;
	var sql = "INSERT INTO reviews.guideReviews (Name, Email, Review, Rating) VALUES ?"
	var values = [[data.revieweeName, data.email, data.review, data.rating]];
	con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
	res.render('guideReviews');

});

module.exports = app;