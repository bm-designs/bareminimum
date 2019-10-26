
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var util = require('util');
var app = express();
app.set('view engine', 'pug');
app.set('/views', __dirname+'/views');
app.use(express.static(__dirname + 'public'));
app.use('/public', express.static(__dirname +'/public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
var eatReviews;
var guideReviews; 
var review;
var eatTotalReviews;
var guideTotalReviews;
var questions;
const PORT = process.env.PORT || 3000

var server = app.listen(PORT || 3000, function() {
	console.log("lisening on port number %d", server.address().port);
});
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
const {Pool, Client} = require('pg');
//const connectionString = 'postgresql://jlaskk:miami014@localhost:5432/BMDB'
const connectionString = 'postgres://igaadmdcybtzah:ce4e9ef2f4d53070acb7d4c6c80be2e731b0bf7358a7ab2673bd055a433a87f0@ec2-54-225-241-25.compute-1.amazonaws.com:5432/d3b1ct3mjklqlb'
const client = new Client({
  connectionString: connectionString,
  ssl: true,
})
client.connect()
app.get('/', function(req, res) {
	
	client.query('SELECT * FROM guidereviews', (err, result) =>{
		if (err) throw err;
		 guideReviews = result.rows;
		client.query('SELECT name, submittedquestion, marker FROM questions', function(err, result){
			if (err) res.render("about");
			questions = result.rows;
			res.render('home',
			{guideReviews:guideReviews,
				questions:questions});
		});

	});
	
});
app.get("/workouts", function(req,res){
	res.render('workout')
});
app.get('/reviews', function(req, res){
	client.query('SELECT * FROM guidereviews', (err, result) =>{
		if (err) throw err;
		 guideReviews = result.rows;
		client.query('SELECT name, submittedquestion, marker FROM questions', function(err, result){
			if (err) res.render("about");
			questions = result.rows;
			res.render('reviews',
			{guideReviews:guideReviews,
				questions:questions});
		});

	});
})
app.post('/rsvp', function(req,res){
	var data = req.body
	console.log(data)
	var bmer = data.bmer;
	var email = data.email;
	if (data.insta) {
		var insta = data.insta;
	} else {
		var insta = ''
	}
	if (data.bio) {
		var bio = data.bio;
	} else {
		var bio = '';
	}
	var values = [bmer,email, insta, bio]
	var query = "INSERT INTO rsvp (bmer, email, insta, bio) VALUES($1,$2,$3,$4)"
	client.query(query,values, function(err,result){
		if (err){
			console.log(err)
			res.render("home")
		}
		console.log(bmer+" "+"RSVP'd")
 	})
 	var transporter = nodemailer.createTransport({
  		service: 'Zoho',
  		auth: {
    		user: 'james@bareminimum.site',
    		pass: 'NE_patriots12'
  		}
	});
	var mailOptions = {
  		from: 'james@bareminimum.site',
  		to: 'james@bareminimum.site',
  		subject: 'New Groupout Client: '+bmer,
  		html: '<h3>Name:</h3><p>'+bmer+'</p><br><h3>Email:</h3><p>'+email+'</p><h3>Insta:</h3><p>'+insta+'</p><h3>Bio</h3><p>'+bio,
	}
	var rsvpConfirmation = {
		from: 'james@bareminimum.site',
		to: email,
		subject: 'BM Groupout RSVP Confirmation',
		html: '<h1>Groupout Every Saturday 10am @ College ave & Parker st Berkeley Ca</h1><h3>Thank you for your RSVP!</h3><br><p>You can reach out to this email directly or contact Bare Minimum through Instagram for more information on the event</p><br><h3>Interested in Personal Training?</h3><br><p>Sessions are only $25! Email james@bareminimum.site for bookings</p><h2>Serious Inquiries Only</h2>'
	}
	transporter.sendMail(mailOptions, function(error, info){
  		if (error) {
    		console.log(error);
  		} else {
    		console.log('Email sent: ' + info.response);
  			}
		})
	transporter.sendMail(rsvpConfirmation, function(error, info){
		if (error){
			console.log(error)
		} else {
			console.log('Email sent: ' + info.response)
		}
	})
 	res.render("home")
})

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
app.post("/comment", function(req,res){
	var data = req.body;
	var query = "INSERT INTO comments (question, comment) VALUES ($1, $2)";
	var values = [parseInt(data.marker), data.comment];
	client.query(query,values, function(err, result){
		if (err) {
			console.log(err)
		}
		res.render('about')
	})
})
app.post("/comments", function(req,res){
	var questionid = req.body.id;
	var query = "SELECT * FROM comments WHERE question= " +questionid;
	client.query(query, function(err, result){
		if (err) {
			console.log('This is bad')
		}
		if (result){
			var pastcomments = result.rows;
			res.send({pastcomments:pastcomments})
		} else {
			res.send("No comments");
		}
		
	})
})
app.get('/about', function(req, res) {
	client.query('SELECT COUNT(*) as total FROM eatingreviews', (err, result) =>{
		if (err) throw err;
		eatTotalReviews = result.rows[0].total;
		client.query('SELECT COUNT(*) as total2 FROM guidereviews', function(err, result){
			if (err) throw err;
			guideTotalReviews = result.rows[0].total2;
			res.render('about',
			{eatTotalReviews: eatTotalReviews,
				guideTotalReviews:guideTotalReviews});
		});

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
		if (err) res.render("about");
		res.render('guideReviews', 
		{guideReviews:guideReviews});
	});


});

app.post("/question", function(req,res){
	var data = req.body;
	var marker;
	client.query("SELECT COUNT(*) as total FROM questions", function(err, result){
		if (err) {
			console.log(err)
			res.send("No Questions")
		}
		marker = result.rows.total;
		var values = [data.fitname, data.fitemail, data.fitquestion, marker];
		client.query("INSERT INTO questions (name, email, submittedquestion, marker) VALUES ($1, $2, $3, $4)", values, function(err, result) {
		if (err) {
			res.render("about");
		}
		res.render("about");
		})
	})
	
})
module.exports = app;