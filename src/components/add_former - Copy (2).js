 import React, {Component} from 'react';
 import Header from './header';
 import {BrowserRouter as Router, Route,Link,Redirect} from 'react-router-dom'; 
 class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			message:"",
			status:""
		}

	}
	 render(){
		 return(
		<div className="container-fluid main_div_new">
		 
			<div className="row no-margin"><div className="col-sm-12 no_padding"><div className="header_class">మన దళారి</div></div></div>
			<div className="row no-margin">
				<div className="col-sm-2 no_padding"><Header selected_menu="formers" /></div>
				<div className="col-sm-10 text-center">
					<div className="row">
						<div className="col-sm-12 m-2"><h3>Add Former</h3><br /></div>
					</div>
					<div className="row">
						<div className="col-sm-12">
						<div className="form_bg">
						<form action="" method="post" onSubmit={this.submit_form.bind(this)}>
								<div className="row">
									<div className="col-sm-12 text-center">
									
										{(this.state.status)?<div className="success_class">{this.state.message}</div>:<div className="error_class">{this.state.message}</div>}
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<div className="row">
											<div className="col-sm-2 label_class">Fist Name</div>
											<div className="col-sm-2"><input type="text" name="first_name" className="form-control" autoFocus /></div>
											<div className="col-sm-2 label_class">Last Name</div>
											<div className="col-sm-2"><input type="text" name="last_name" className="form-control" /></div>
											<div className="col-sm-2 label_class">Phone Number</div>
											<div className="col-sm-2"><input type="text" name="phone_number" className="form-control" /></div>
										</div>
									</div>
									
								</div>
								<div className="row">
									<div className="col-sm-2 label_class"><br />Address</div>
									<div className="col-sm-10"><br />
										<textarea rows="3" name="address" className="form-control">
										</textarea>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12 text-center"><br /><br />
										<input type="submit" name="submit" value="submit" className="btn btn-primary" />
									</div>
								</div>
								
							</form>
							</div>

							</div>
						</div>
					</div>
					
			</div>
		</div>
		 );
	 }
	 componentDidMount(){
		/*fetch("http://127.0.0.1:3001/formers",{
		 method:"POST",
			 headers:{
				 "Accept":"text/plain",
				 "Content-Type":"application/x-www-form-urlencoded"
			 },
			 body:"results_from=0&results_to=10&search_string"
				
		 })
		 .then(function(response){
			 
			 return response.json();
		 })
		 .then((responsive_data)=>{
			 if(responsive_data.status==1){
				 this.setState({data:responsive_data.formers});
				 this.setState({total_records:responsive_data.total});
			 }else{
				 
			 }
		 })*/
	 }
	 submit_form(e){
		 e.preventDefault();
		 var data = {
			first_name : e.target.first_name.value,
			last_name : e.target.last_name.value,
			phone_number : e.target.phone_number.value,
			address : e.target.address.value
		 }
		 
		 
		 fetch("http://127.0.0.1:3001/add_former",{
		 method:"POST",
			 headers:{
				 "Accept":"text/plain",
				 "Content-Type":"application/x-www-form-urlencoded"
			 },
			 body:"first_name="+data.first_name+"&last_name="+data.last_name+"&phone_number="+data.phone_number+"&address="+data.address+"&"
				
		 })
		 .then(function(response){
			 
			 return response.json();
		 })
		 .then((responsive_data)=>{
			 if(responsive_data.status==1){
				 
				 this.setState({message:responsive_data.message,status:responsive_data.status});
			 }else{
				 this.setState({message:responsive_data.message,status:responsive_data.status});
			 }
		 })
		 
	 }
		 
	 delete_row(e,former_id,row_id){
		 
		/*var data = {
			 username:e.target.username.value,
			 password:e.target.password.value
		 }*/

		 var conform_value = window.confirm("A`re you sure want to delete");
		 if(!conform_value){
			 return false;
		 }
	
		fetch("http://127.0.0.1:3001/delete_former",{
		 method:"POST",
			 headers:{
				 "Accept":"text/plain",
				 "Content-Type":"application/x-www-form-urlencoded"
			 },
			 body:"former_id="+former_id+""
				
		 })
		 .then(function(response){
			 
			 return response.json();
		 })
		 .then((responsive_data)=>{
			 if(responsive_data.status==1){
				 
				 var data = this.state.data
				 data.splice(row_id,1);
				 this.setState({data:data});
				 var total = (this.state.total_records)-1;
				 
				 this.setState({total_records:total});
			 }else{
				 
			 }
		})
		 
		 
		
	 }
	
 }
 export default Login;
 


 