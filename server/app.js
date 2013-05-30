'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var async = require('async');
var hbs = require('express-hbs');
var baucis = require('baucis');
var faye = require('faye');
var socketIO = require('socket.io');



// start mongoose
var mongooseSetup = require('./mongooseInit');
mongooseSetup.createDB( 'Products' );
mongooseSetup.testDB();


// init express
var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);

    app.set('view engine', 'handlebars');
    app.set('views', __dirname + '../app/scripts/views');
});

// set logging
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

// mount static
app.use(express.static( path.join( __dirname, '../app') ));
app.use(express.static( path.join( __dirname, '../.tmp') ));


// route index.html
app.get('/', function(req, res){
  res.sendfile( path.join( __dirname, '../app/index.html' ) );
});


app.get('/api/:folder', function( req, res ){

	// get folder ID
	var pageNumber = req.params.folder;
	console.log(pageNumber);

	// set up request config
	var options = {
		host: 'www.saksfifthavenue.com',
		path: '/saks-api/v2/products/page/' + pageNumber
	};

	// make request to saks
	http.request(options, function(response) {
		var str = '';

		response.on('data', function (chunk) {
			str += chunk;
		});

		response.on('end', function () {
			console.log(str);

			// send back to browser
			res.send( JSON.parse(str));
		});
	}).end();

});


// start server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express App started!');
});

