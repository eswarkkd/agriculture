var express = require('express');
var app = express();
var mysql = require('mysql');

var con = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"agriculture"
});

var err;


app.post('/login',function(req,res){
	
	con.connect(function(){
	
	if(err) throw err;
	con.query("select * from users", function(err,result,fields){
		if(err) throw err;
	
	res.contentType('application/json');
	res.setHeader("Access-Control-Allow-Origin","*");
	res.json(result);
	//res.sendStatus(200);
	//res.send();
		});
	})




})


var server = app.listen('3001',function(){
	console.log("server started");
});