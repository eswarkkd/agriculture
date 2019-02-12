 import React, {Component} from 'react';
 import {BrowserRouter as Router, Route,Link,Redirect} from 'react-router-dom';
 
 
 class header extends Component{
	constructor(props){
		super(props);
		this.state = {
			selected_menu : ""
		}

	}
	 render(){
		 return(
		
			<div className="row height_class">
				<div className="col-sm-12">					
					<div className="menu d-none d-sm-block">
					<ul>
						<li><Link to="/dashboard" className={(this.props.selected_menu=="dashboard")? "active":"" }>Dashboard</Link></li>
						<li><Link to="/formers" className={(this.props.selected_menu=="formers")? "active":"" }>Formers</Link></li>
						<li><Link to="/purchases" className={(this.props.selected_menu=="purchases")? "active":"" }>Purchases</Link></li>
						<li><Link to="/pays" className={(this.props.selected_menu=="pays")? "active":"" }>Pays</Link></li>
						<li><Link to="/" className={(this.props.selected_menu=="logout")? "active":"" }>Logout</Link></li>
					</ul>
					</div>
					<div className="response_menu d-block d-sm-none">
					<div class="mobile_menu1"><Link to="/dashboard" className={(this.props.selected_menu=="dashboard")? "active":"" }>Dashboard</Link></div>
					<div class="mobile_menu2"><Link to="/formers" className={(this.props.selected_menu=="formers")? "active":"" }>Formers</Link></div>
					<div class="mobile_menu3"><Link to="/purchases" className={(this.props.selected_menu=="purchases")? "active":"" }>Purchases</Link></div>
					<div class="mobile_menu4"><Link to="/pays" className={(this.props.selected_menu=="pays")? "active":"" }>Pays</Link></div>
					<div class="mobile_menu5"><Link to="/" className={(this.props.selected_menu=="logout")? "active":"" }>Logout</Link></div>
					
					</div>
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
	 
 }
 export default header;
 
