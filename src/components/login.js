 import React, {Component} from 'react';
 import {BrowserRouter as Router, Route,Link,Redirect} from 'react-router-dom';
 
 class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			message: "",
			login:false
		}

	}
	 render(){
		 if(this.state.login){
			 return <Redirect push to="/dashboard" />
		 }
		 return(
		<form action="login" method="post" onSubmit={this.login_action.bind(this)} className="form_class">
			<div className="row">
				<div className="col-sm-6 login_box_center">
					<div className="row">
					<div className="col-sm-12 heading_text text-center">Login</div>
						<div className="col-sm-12 text-center">{ (this.state.message)? <div className="alert alert-danger">{this.state.message}</div>:<div></div> }</div>
					</div>
					<div className="row m-2">
						<div className="col-sm-4">Username</div>
						<div className="col-sm-8"><input type="text" name="username" className="form-control" autoFocus /></div>
					</div>
					<div className="row m-2">
						<div className="col-sm-4">Password</div>
						<div className="col-sm-8"><input type="text" name="password" className="form-control" /></div>
					</div>
					<div className="row m-3">
						<div className="col-sm-12 text-center">
						
						<input type="submit" name="submit" className="btn btn-primary" value="Login" />
						
						</div>
					</div>
				</div>
			</div>
			</form>
		 );
	 }
	 login_action(e){
		 e.preventDefault();
this.setState({message:""});

		 var data = {
			 username:e.target.username.value,
			 password:e.target.password.value
		 }
	
		 
			 
		 
		 		
		 
		 fetch("http://127.0.0.1:3001/login",{
		 method:"POST",
			 headers:{
				 "Accept":"text/plain",
				 "Content-Type":"application/x-www-form-urlencoded"
			 },
			 body:"username="+data.username+"&password="+data.password
				
		 })
		 .then(function(response){
			 
			 return response.json();
			 //var response_var = JSON.stringify(response);
			 
			 
			//return response;
			//this.setState(function(state,props){ return  {title:response.username}});
		 })
		 .then((response_data)=>{
			if(response_data.status==0){
				//this.setState(function(state,props){ return  { message:response_data.message }});	
				this.setState({message:response_data.message});
			}else if(response_data.status==1){
				this.setState({login:true});
			}
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
 
