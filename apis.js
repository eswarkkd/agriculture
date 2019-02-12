var express = require('express');
var app = express();
var mysql = require('mysql');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var con = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"agriculture"
});

var err;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.static('public'));
/*app.configure(function(){
	app.use(express.bodyParser());
	app.use(app.router);
});*/
var token = "werqwerw";
var return_array = "";




app.post('/login/',function(req,res){
	con.connect(function(){
	var data = {
		username:req.body.username,
		password:req.body.password
		};

	res.contentType('application/json');
	res.setHeader("Access-Control-Allow-Origin","*");
	
	if(req.body.username==""){
		return_array = {"status":0, "message":"Please enter username"};
	}
	
	if(req.body.password==""){
		return_array = {"status":0, "message":"Please enter password"};
	}


	if(req.body.username!="" && req.body.password!=""){
		if(err) throw err;
	con.query("select * from users where username='"+data.username+"' and password='"+data.password+"' ",[data.username,data.password], function(err,result,fields){
		if(err) throw err;
		
	if(result.length>0){
		if(result[0].username==req.body.username && result[0].password==req.body.password){
			
		if(err) throw err;
			if(err) throw err;
		con.query("update users set token = 'werqewrdrwerewqrwe' where id='"+result[0].id+"'", function(err,user_update_result,fields){
		});
		
		if(err) throw err;
		con.query("select token from users where id='"+result[0].id+"'", function(err,update_result,fields){
			if(err) throw err;
			token = update_result[0].token;
			return_array = {"status":1, "message":"success","token":token};
		});
		
		
		
		
		}
	}
	else{
		return_array = {"status":0, "message":"wrong username or password"};
	}
	
//	res.json({"username":req.query.username});
	//res.sendStatus(200);
	//res.write(JSON.stringify(data));
	//res.write("{username : "+req.query.username+"}");
	});
	
	}
	res.json(return_array);
	res.end();
		
	})




})
app.post('/add_former/',function(req,res){
	con.connect(function(){
		
	var data = {
		first_name:req.body.first_name,
		last_name:req.body.last_name,
		address:req.body.address,
		phone_number:req.body.phone_number
		};
	error_message="";
	res.contentType('application/json');
	res.setHeader("Access-Control-Allow-Origin","*");
	
	if(req.body.first_name==""){
		error_message+=" first name";
	}
	
	if(req.body.last_name==""){
		error_message+=" last name";
	}
	
	if(req.body.address==""){
		error_message+=" address";
	}
	
	if(req.body.phone_number==""){
		error_message+=" phone number";
	}


	if(!error_message){
		
		if(err) throw err;
		con.query("insert into formers (first_name,last_name,address,phone_number) values(?,?,?,?)",[data.first_name,data.last_name, data.address,data.phone_number],function(err,result,fields){			
			if(result.affectedRows){
				return_array={"status":1,"message":"successfully added former"};				
				res.json(return_array);
				res.end();
			}else{
				return_array={"status":0,"message":"error"};				
				res.json(return_array);
				res.end();
			}
		});
	
	}else{
				return_array={"status":0,"message":"Please enter these filds "+error_message};				
	}
	
	
	
	
	
		
	})




})
app.post('/update_former/',function(req,res){
	con.connect(function(){
		
	var data = {
		id:req.body.id,
		first_name:req.body.first_name,
		last_name:req.body.last_name,
		address:req.body.address,
		phone_number:req.body.phone_number
		};

	res.contentType('application/json');
	res.setHeader("Access-Control-Allow-Origin","*");
	var error_message="";
	if(req.body.first_name==""){
		error_message+=" first name";
	}
	
	if(req.body.last_name==""){
		error_message+=" last name";
	}
	
	if(req.body.address==""){
		error_message+=" address";
	}
	
	if(req.body.phone_number==""){
		error_message+=" phone number";
	}


	if(!error_message){
		
		if(err) throw err;
		con.query("update formers set first_name=?, last_name=?, address=?, phone_number=? where id=?",[data.first_name,data.last_name, data.address,data.phone_number,data.id],function(err,result,fields){			
		
			if(result.affectedRows){
				return_array={"status":1,"message":"successfully updated former"};
				res.json(return_array);
				res.end();				
			}else{
				return_array={"status":0,"message":"error"};				
				res.json(return_array);
				res.end();
			}
		});
	
	}else{
				return_array={"status":0,"message":"Please enter these fields"+error_message};				
				res.json(return_array);
				res.end();
	}
	
	
	
	
	
		
	})




})
app.post('/formers/',function(req,res){
	
	con.connect(function(){
	var data = {
		results_from:req.body.results_from,
		results_to:req.body.results_to,
		search_str:req.body.search_string
		};
	res.contentType('application/json')
	res.setHeader("Access-Control-Allow-Origin","*");
	
		if(err) throw err;
		con.query("select * from formers", function(err,formers_result,fields){
				
				if(formers_result.length>0){
					if(err) throw err;
					
					var query_string="";
					if(req.body.search_str!=""){
						var query_string = "where first_name like '%"+req.body.search_string+"%' or last_name like '%"+req.body.search_string+"%'"
					}
					if(req.body.results_from==""){
						data.results_from=0;
					}
					if(req.body.results_to==""){
						data.results_to=10;
					}
					
					
					var formers_list = "";
					if(err) throw err;
					con.query("select * from formers "+query_string+" order by id DESC limit "+data.results_from+","+data.results_to+"", function(err,formers_result_new,fields){
					return_array={"status":1,"total":formers_result_new.length, "message":"Total "+formers_result.length+" Results Found", "formers":formers_result_new};
					res.json(return_array);
					res.end();			
					})
					
				}else{
					return_array={"status":1,"message":"Result Not Found"};
					res.json(return_array);
					res.end();
				}
		})
		
	})
	
})

app.post('/delete_former/',function(req,res){
	
	con.connect(function(){
	var data = {
		former_id:req.body.former_id,
		};
	res.contentType('application/json')
	res.setHeader("Access-Control-Allow-Origin","*");
		
		if(req.body.former_id){
			if(err) throw err;
			con.query("delete from formers where id=?",[data.former_id], function(err,former_delete,fields){

					if(former_delete.affectedRows){
						return_array={"status":1,"message":"Deleted"};
					}else{
						return_array={"status":0,"message":"error"};
					}

			})
		}
		
		res.json(return_array);
		res.end();
	})
	
})

app.post('/add_purchase/',function(req,res){
	con.connect(function(){
		
	var data = {
		former_id:req.body.former_id,
		item_name:req.body.item_name,
		quantity:req.body.quantity,
		quantity_type:req.body.quantity_type,
		item_price:req.body.item_price,
		amount:req.body.amount
		};

	res.contentType('application/json');
	res.setHeader("Access-Control-Allow-Origin","*");
	
	if(req.body.former_id==""){
		return_array = {"status":0, "message":"Please select former"};
	}
	
	if(req.body.item_name==""){
		return_array = {"status":0, "message":"Please select item name"};
	}
	
	if(req.body.quantity==""){
		return_array = {"status":0, "message":"Please enter quantity"};
	}
	
	if(req.body.quantity_type==""){
		return_array = {"status":0, "message":"Please enter quantity type"};
	}
	
	if(req.body.item_price==""){
		return_array = {"status":0, "message":"Please enter item price"};
	}
	
	if(req.body.amount==""){
		return_array = {"status":0, "message":"please enter amount"};
	}


	if(req.body.former_id!="" && req.body.item_name!="" && req.body.quantity_type!="" && req.body.quantity!="" && req.body.item_price!="" && req.body.amount!=""){
		
		if(err) throw err;
		con.query("insert into purchases (former_id,item_name,quantity,quantity_type,item_price,amount) values(?,?,?,?,?,?)",[data.former_id,data.item_name, data.quantity,data.quantity_type,data.item_price,data.amount],function(err,result,fields){			
			if(result.affectedRows){
				return_array={"status":1,"message":"successfully added purchase"};
				res.json(return_array);
				res.end();				
			}else{
				return_array={"status":0,"message":"error"};				
				res.json(return_array);
				res.end();
			}
		});
	
	}
	
	
	
	
	
		
	})




})
app.post('/edit_purchase/',function(req,res){
	con.connect(function(){
		
	var data = {
		purchase_id:req.body.purchase_id,
		former_id:req.body.former_id,
		item_name:req.body.item_name,
		quantity:req.body.quantity,
		quantity_type:req.body.quantity_type,
		item_price:req.body.item_price,
		amount:req.body.amount
		};

	res.contentType('application/json');
	res.setHeader("Access-Control-Allow-Origin","*");
	
	if(req.body.former_id==""){
		return_array = {"status":0, "message":"Please select former"};
	}
	
	if(req.body.item_name==""){
		return_array = {"status":0, "message":"Please select item name"};
	}
	
	if(req.body.quantity==""){
		return_array = {"status":0, "message":"Please enter quantity"};
	}
	
	if(req.body.quantity_type==""){
		return_array = {"status":0, "message":"Please enter quantity type"};
	}
	
	if(req.body.item_price==""){
		return_array = {"status":0, "message":"Please enter item price"};
	}
	
	if(req.body.amount==""){
		return_array = {"status":0, "message":"please enter amount"};
	}
	


	if(req.body.former_id!="" && req.body.item_name!="" && req.body.quantity_type!="" && req.body.quantity!="" && req.body.item_price!="" && req.body.amount!="" && req.body.purchase_id!=""){
		
		if(err) throw err;
		con.query("update purchases set former_id=?, item_name=?, quantity=?, quantity_type=?, item_price=?, amount=?  where id=?",[data.former_id,data.item_name,data.quantity,data.quantity_type,data.item_price,data.amount,data.purchase_id],function(err,result,fields){			
		
			if(result.affectedRows){
				return_array={"status":1,"message":"successfully updated purchase"};				
			}else{
				return_array={"status":0,"message":"error"};					
			}
		});
	
	}
	
	
	
	res.json(return_array);
	res.end();
		
	})




})
app.post('/purchases/',function(req,res){
	
	con.connect(function(){
	var data = {
		results_from:req.body.results_from,
		results_to:req.body.results_to,
		search_str:req.body.search_string
		};
	res.contentType('application/json')
	res.setHeader("Access-Control-Allow-Origin","*");
	
		if(err) throw err;
		con.query("select * from formers", function(err,formers_result,fields){
				var search_string="";
				if(formers_result.length>0){
					if(err) throw err;
					
					var query_string="";
					/*if(req.body.search_str!=""){
						var query_string = "where first_name like '%"+req.body.search_string+"%' or last_name like '%"+req.body.search_string+"%'"
					}*/
					if(req.body.results_from==""){
						data.results_from=0;
					}
					if(req.body.results_to==""){
						data.results_to=100;
					}
					if(req.body.search_string){
						search_string = "where purchases.former_id='"+req.body.search_string+"'";
					}
					
					
					var formers_list = "";
					if(err) throw err;
					con.query("select purchases.*,formers.first_name,formers.last_name from purchases left join formers on purchases.former_id=formers.id "+search_string+" order by id DESC limit "+data.results_from+","+data.results_to+"", function(err,purchases_result,fields){
					
					return_array={"status":1,"total":purchases_result.length, "message":"Total "+purchases_result.length+" Results Found", "results":purchases_result};
					res.json(return_array);
					res.end();
					})
					
					
					
				}else{
					return_array={"status":1,"message":"Result Not Found"};
					res.json(return_array);
					res.end();
				}
		})
		
	})
	
})

app.post('/delete_purchase/',function(req,res){
	
	con.connect(function(){
	var data = {
		purchase_id:req.body.purchase_id,
		};
	res.contentType('application/json')
	res.setHeader("Access-Control-Allow-Origin","*");
		
		if(req.body.purchase_id){
			if(err) throw err;
			con.query("delete from purchases where id=?",[data.purchase_id], function(err,former_delete,fields){

					if(former_delete.affectedRows){
						return_array={"status":1,"message":"Deleted"};
					}else{
						return_array={"status":0,"message":"Error while delete"};
					}

			})
		}
		
		res.json(return_array);
		res.end();
	})
	
})


app.post('/add_pay/',function(req,res){
	con.connect(function(){
		
	var data = {
		former_id:req.body.former_id,
		purchase_id:req.body.purchase_id,
		description:req.body.description,
		amount:req.body.amount
		};

	res.contentType('application/json');
	res.setHeader("Access-Control-Allow-Origin","*");
	
	if(req.body.former_id==""){
		return_array = {"status":0, "message":"Please select former"};
	}
	
	if(req.body.purchase_id==""){
		return_array = {"status":0, "message":"Please select pay purchase"};
	}
	
	if(req.body.description==""){
		return_array = {"status":0, "message":"Please enter description"};
	}
	
	if(req.body.amount==""){
		return_array = {"status":0, "message":"Please enter amount"};
	}
	


	if(req.body.former_id!="" && req.body.purchase_id!="" && req.body.description!="" && req.body.amount!=""){
		
		if(err) throw err;
		con.query("insert into pays (former_id,purchase_id,description,amount) values(?,?,?,?)",[data.former_id,data.purchase_id, data.description,data.amount],function(err,result,fields){			
			if(result.affectedRows){
				return_array={"status":1,"message":"successfully added pay"};				
			}else{
				return_array={"status":0,"message":"error"};				
			}
		});
	
	}
	
	
	
	
	res.json(return_array);
	res.end();
		
	})




})
app.post('/edit_pay/',function(req,res){
	con.connect(function(){
		
	var data = {
		former_id:req.body.former_id,
		purchase_id:req.body.purchase_id,
		description:req.body.description,
		amount:req.body.amount,		
		pay_id:req.body.pay_id	
		};

	res.contentType('application/json');
	res.setHeader("Access-Control-Allow-Origin","*");
	
	if(req.body.former_id==""){
		return_array = {"status":0, "message":"Please select former"};
	}
	
	if(req.body.purchase_id==""){
		return_array = {"status":0, "message":"Please select pay purchase"};
	}
	
	if(req.body.description==""){
		return_array = {"status":0, "message":"Please enter description"};
	}
	
	if(req.body.amount==""){
		return_array = {"status":0, "message":"Please enter amount"};
	}
	


	if(req.body.former_id!="" && req.body.purchase_id!="" && req.body.description!="" && req.body.amount!="" && req.body.pay_id!=""){
		
		if(err) throw err;
		con.query("update pays set former_id=?, purchase_id=?, description=?, amount=?  where id=?",[data.former_id,data.purchase_id,data.description,data.amount,data.pay_id],function(err,result,fields){		
		
			if(result.affectedRows){
				return_array={"status":1,"message":"successfully updated pay"};				
			}else{
				return_array={"status":0,"message":"error"};					
			}
		});
	
	}
	
	
	
	res.json(return_array);
	res.end();
		
	})
})
app.post('/pays/',function(req,res){
	
	con.connect(function(){
	var data = {
		results_from:req.body.results_from,
		results_to:req.body.results_to,
		search_str:req.body.search_string
		};
	res.contentType('application/json')
	res.setHeader("Access-Control-Allow-Origin","*");
	
		if(err) throw err;
		con.query("select * from formers", function(err,formers_result,fields){
				
				if(formers_result.length>0){
					if(err) throw err;
					
					var query_string="";
					/*if(req.body.search_str!=""){
						var query_string = "where first_name like '%"+req.body.search_string+"%' or last_name like '%"+req.body.search_string+"%'"
					}*/
					if(req.body.results_from==""){
						data.results_from=0;
					}
					if(req.body.results_to==""){
						data.results_to=100;
					}
					
					
					var formers_list = "";
					if(err) throw err;
					con.query("select pays.*, formers.first_name,formers.last_name from pays left join formers on pays.former_id = formers.id order by pays.id limit "+data.results_from+","+data.results_to+"", function(err,result,fields){
					return_array={"status":1,"total":result.length, "message":"Total "+result.length+" Results Found", "results":result};
					res.json(return_array);
					res.end();
					})
				}else{
					return_array={"status":1,"message":"Result Not Found"};
					res.json(return_array);
					res.end();
				}
		})
		
	})
	
})

app.post('/delete_pay/',function(req,res){
	
	con.connect(function(){
	var data = {
		pay_id:req.body.pay_id,
		};
	res.contentType('application/json')
	res.setHeader("Access-Control-Allow-Origin","*");
		
		if(req.body.pay_id){
			if(err) throw err;
			con.query("delete from pays where id=?",[data.pay_id], function(err,former_delete,fields){

					if(former_delete.affectedRows){
						return_array={"status":1,"message":"Deleted"};
					}else{
						return_array={"status":0,"message":"Error while delete"};
					}

			})
		}
		
		res.json(return_array);
		res.end();
	})
	
})
app.post('/get_formers/',function(req,res){
	
	con.connect(function(){
	
	res.contentType('application/json')
	res.setHeader("Access-Control-Allow-Origin","*");
	
		if(err) throw err;
		con.query("select id,first_name,last_name from formers", function(err,formers_result,fields){
				
				if(formers_result.length>0){
					
					return_array={"status":1,"formers":formers_result};
					res.json(return_array);
					res.end();
				}else{
					return_array={"status":0,"message":"Result Not Found"};
					res.json(return_array);
					res.end();
				}
		})
		
	})
	
})
app.post('/get_purchase_by_id/',function(req,res){
	
	con.connect(function(){
	var data = {
		purchase_id:req.body.purchase_id
	}
	res.contentType('application/json')
	res.setHeader("Access-Control-Allow-Origin","*");
	
		if(err) throw err;
		con.query("select * from purchases where id =?",[data.purchase_id], function(err,result,fields){
				
				if(result.length>0){
					
					return_array={"status":1,"result":result};
					res.json(return_array);
					res.end();
				}else{
					return_array={"status":0,"message":"Result Not Found"};
					res.json(return_array);
					res.end();
				}
		})
		
	})
})
app.post('/get_pays_by_former/',function(req,res){
	
	con.connect(function(){
	var data = {
		former_id:req.body.former_id
	}
	res.contentType('application/json')
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-Width, ");
	
		if(err) throw err;
		con.query("select * from pays where former_id =?",[data.former_id], function(err,result,fields){
				
				if(result.length>0){
					
					return_array={"status":1,"formers":result};
					
				}else{
					return_array={"status":0,"message":"Result Not Found"};
				}
		})
		res.json(return_array);
		res.end();
	})
})
app.post('/get_former_by_id/',function(req,res){
	
	con.connect(function(){
	var data = {
		former_id:req.body.former_id
	}
	res.contentType('application/json')
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-Width, ");
		if(err) throw err;
		con.query("select * from formers where id =?",[data.former_id], function(err,result,fields){
				
				if(result.length>0){
					
					return_array={"status":1,"formers":result};
					
				}else{
					return_array={"status":0,"message":"Result Not Found"};
				}
		})
		res.json(return_array);
		res.end();
	})
})


var server = app.listen('3001',function(){
	console.log("server started");
});

