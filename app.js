
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

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

var server = app.listen(process.env.PORT || 3000, function() {
	console.log("lisening on port number %d", server.address().port);
});
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
const {Pool, Client} = require('pg');
const connectionString = 'postgresql://jlaskk:miami014@localhost:5432/BMDB'
//const connectionString = 'postgres://igaadmdcybtzah:ce4e9ef2f4d53070acb7d4c6c80be2e731b0bf7358a7ab2673bd055a433a87f0@ec2-54-225-241-25.compute-1.amazonaws.com:5432/d3b1ct3mjklqlb'
const client = new Client({
  connectionString: connectionString,
})
client.connect()


app.get('/', function(req, res) {	
	client.query('SELECT COUNT(*) as total FROM eatingreviews', (err, result) =>{
		if (err) throw err;
		eatTotalReviews = result.rows[0].total;
		client.query('SELECT COUNT(*) as total2 FROM guidereviews', function(err, result){
			if (err) throw err;
			guideTotalReviews = result.rows[0].total2;
			res.render('guides',
			{eatTotalReviews: eatTotalReviews,
				guideTotalReviews:guideTotalReviews});
		});

	});
	
});

app.get('/guides', function(req, res) {
	client.query('SELECT COUNT(*) as total FROM eatingreviews', (err, result) =>{
		if (err) throw err;
		eatTotalReviews = result.rows[0].total;
		client.query('SELECT COUNT(*) as total2 FROM guidereviews', function(err, result){
			if (err) throw err;
			guideTotalReviews = result.rows[0].total2;
			res.render('guides',
			{eatTotalReviews: eatTotalReviews,
				guideTotalReviews:guideTotalReviews});
		});

	});
});

app.get('/about', function(req, res) {
	client.query('SELECT COUNT(*) as total FROM eatingreviews', (err, result) =>{
		if (err) throw err;
		eatTotalReviews = result.rows[0].total;
		client.query('SELECT COUNT(*) as total2 FROM guidereviews', function(err, result){
			if (err) throw err;
			guideTotalReviews = result.rows[0].total2;
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
	client.query("SELECT * FROM eatingreviews", function(err, result) {
		eatReviews = result.rows;
		if (err) throw err;
		res.render('eatingReviews', 
		{eatReviews:eatReviews});
	});
});

app.get("/guideReviews", function(req,res) {
	client.query("SELECT * FROM guidereviews", function(err, result) {
		guideReviews = result.rows;
		if (err) throw err;
		res.render('guideReviews', 
		{guideReviews:guideReviews});
	});
});

app.post("/processEatingReview", function(req,res) {
	var data = req.body;
	var values = [data.revieweeName, data.email, data.review, data.rating];
	client.query('INSERT INTO eatingreviews (Name, Email, Review, Rating) VALUES ($1, $2, $3, $4)', values, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
	client.query("SELECT * FROM eatingreviews", function(err, result) {
		eatReviews = result.rows;
		if (err) throw err;
		res.render('eatingReviews', 
		{eatReviews:eatReviews});
	});
});

app.post("/processGuideReview", function(req,res) {
	var data = req.body;
	var sql = ""
	var values = [data.revieweeName, data.email, data.review, data.rating];
	client.query('INSERT INTO guidereviews (Name, Email, Review, Rating) VALUES ($1, $2, $3, $4)', values, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
	client.query("SELECT * FROM guidereviews", function(err, result) {
		guideReviews = result.rows;
		if (err) throw err;
		res.render('guideReviews', 
		{guideReviews:guideReviews});
	});

});
module.exports = app;