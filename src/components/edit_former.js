 import React, {Component} from 'react';
 import Header from './header';
 import {BrowserRouter as Router, Route,Link,Redirect} from 'react-router-dom'; 
 class Edit_Former extends Component{
	constructor(props){
		super(props);
		this.state = {
			first_name:"",
			last_name:"",
			phone_number:"",
			address:"",
			id:"",
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
						<div className="col-sm-12 m-2"><h3>Edit Former</h3><br /></div>
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
											<div className="col-sm-2"><input type="text" name="first_name" className="form-control" value={this.state.first_name}  onChange={e=>this.setState({first_name:e.target.value })} /></div>
											<div className="col-sm-2 label_class">Last Name</div>
											<div className="col-sm-2"><input type="text" name="last_name" className="form-control" value={this.state.last_name} onChange={e=>this.setState({last_name:e.target.value })} /></div>
											<div className="col-sm-2 label_class">Phone Number</div>
											<div className="col-sm-2"><input type="text" name="phone_number" className="form-control" value={this.state.phone_number} onChange={e=>this.setState({phone_number:e.target.value })} /><input type="hidden" name="id" className="form-control" value={this.state.id} /></div>
										</div>
									</div>
									
								</div>
								<div className="row">
									<div className="col-sm-2 label_class"><br />Address</div>
									<div className="col-sm-10"><br />
										<textarea rows="3" name="address" className="form-control" value={this.state.address} onChange={e=>this.setState({address:e.target.value })}></textarea>
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
		fetch("http://127.0.0.1:3001/get_former_by_id",{
		 method:"POST",
			 headers:{
				 "Accept":"text/plain",
				 "Content-Type":"application/x-www-form-urlencoded"
			 },
			 body:"former_id="+window.edit_former+"&"
				
		 })
		 .then(function(response){
			 
			 return response.json();
		 })
		 .then((responsive_data)=>{
			 if(responsive_data.status==1){
				 
				 this.setState({first_name:responsive_data.formers[0].first_name,last_name:responsive_data.formers[0].last_name,phone_number:responsive_data.formers[0].phone_number,address:responsive_data.formers[0].address,id:responsive_data.formers[0].id});
				 
			 }else{
				 
			 }
		 })
	 }
	 submit_form(e){
		 e.preventDefault();
		 var data = {
			first_name : e.target.first_name.value,
			last_name : e.target.last_name.value,
			phone_number : e.target.phone_number.value,
			address : e.target.address.value,
			id : this.state.id
		 }
		 
		 
		 fetch("http://127.0.0.1:3001/update_former",{
		 method:"POST",
			 headers:{
				 "Accept":"text/plain",
				 "Content-Type":"application/x-www-form-urlencoded"
			 },
			 body:"first_name="+data.first_name+"&last_name="+data.last_name+"&phone_number="+data.phone_number+"&address="+data.address+"&id="+data.id+"&"
				
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
	
 }
 export default Edit_Former;
 


 