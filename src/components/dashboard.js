 import React, {Component} from 'react';
 import Header from './header';
 
 class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			title: "Login"
		}

	}
	 render(){
		 return(
		<div className="container-fluid main_div_new">
			<div className="row no-margin"><div className="col-sm-12 no_padding"><div className="header_class">మన దళారి</div></div></div>
			<div className="row no-margin">
			<div className="col-sm-2 no_padding"><Header selected_menu="dashboard" /></div>
			<div className="col-sm-10 text-center"><h3>Dashboard</h3> </div>
			</div>
		</div>
		 );
	 }
	 login_action(e){
		 e.preventDefault();

		 var data = {
			 username:e.target.username.value,
			 password:e.target.password.value
		 }
	
		 
			 
		 
		 
		
		 
		 fetch("http://127.0.0.1:3001/login/?username="+e.target.username.value+"&password="+e.target.password.value,{
		 method:"POST",
			 headers:{
				 "Accept":"text/plain",
				 "Content-Type":"application/x-www-form-urlencoded"
			 },
			 body:JSON.stringify(data)			 
				
		 })
		 .then(function(response){
			 
			 return response.json();
			 //var response_var = JSON.stringify(response);
			 
			 
			//return response;
			//this.setState(function(state,props){ return  {title:response.username}});
		 })
		 .then(function(response_data){ 
			
		 	//this.setState(function(state,props){ return  { title:response_data.username }});
			alert(response_data.username);
			console.log(response_data.username);
			
		 })
		 
		 /*$.post("http://127.0.0.1:3001/login",data,function(newdata){

alert("weqrwe");

		 });*/
		 // array function

		 //this.setState((state,props)=>({title:"this is new login"}));
		 
		 //this.setState(function(state,props){ return  {title:"weqrqwe"}});
		 //this.props.history.push("/");
		 //$.post('login_action_new',$('.form_class').serialize());
		 //$('.login_heading').css({color:'blue'});
	 }
	 redirect(respons_value){
		 alert(respons_value);
	 }
 }
 export default Login;
 
