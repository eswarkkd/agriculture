 import React, {Component} from 'react';
 import Header from './header';
 import {BrowserRouter as Router, Route,Link,Redirect} from 'react-router-dom'; 
 class Add_Former extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: [],
			total_records:0
		}

	}
	 render(){
		 return(
		<div className="container-fluid main_div_new">
		 
			<div className="row no-margin"><div className="col-sm-12 no_padding"><div className="header_class">మన దళారి</div></div></div>
			<div className="row no-margin">
				<div className="col-sm-2 no_padding"><Header selected_menu="formers" /></div>
				<div className="col-sm-10 text-center">
				<div><h3>Formers</h3></div>
				
				<div className="row m-1">
				<div className="col-sm-6 col-6 text-left no_padding"><b>Total Records {this.state.total_records}</b></div>
				<div className="col-sm-6 col-6 text-right"><Link to="/add_former" className="btn btn-primary btn-sm">Add Former</Link></div>
				</div>
				
				<div className="row m-1">
				<div className="col-sm-12 col-12 text-right">
				<form action="search_former" onSubmit={this.search_former.bind(this)}>
					<div className="overflow_class">
					<div className="float_right m-1"><input type="submit" name="submit" value="Search" className="btn btn-primary btn-sm" /></div>
						<div className="float_right m-1"><input type="text" name="search_field" className="form-control form-control-sm" /></div>
						
						
					</div>
				</form>
				</div>
				</div>
				
				<div className="tablel-responsive">
					<table className="table table-bordered table-striped table_class">
					<tbody>
					<tr>
						<th width="5%">S.No</th>
						<th width="45%">Former Name</th>
						<th width="10%">Mobile</th>
						<th width="30%">Address</th>
						<th width="10%">Options</th>
					</tr>
					{(this.state.data)?this.state.data.map((former,i)=>(
					<tr key={i}>
						<td>{i+1}</td>
						<td>{former.first_name} {former.last_name}</td>
						<td>{former.phone_number}</td>
						<td>{former.address}</td>
						<td><Link to="edit_former" onClick={(e)=>this.global_var(e,former.id)}><span className="edit_button"></span></Link>
						<span className="close_button" onClick={(e)=>this.delete_row(e,former.id,i)} ></span>
						</td>
					</tr>					
					)):""}
					
					</tbody>
					
						
					</table>
					</div>
				</div>
			</div>
		</div>
		 );
	 }
	 componentDidMount(){
		fetch("http://127.0.0.1:3001/formers",{
		 method:"POST",
			 headers:{
				 "Accept":"text/plain",
				 "Content-Type":"application/x-www-form-urlencoded"
			 },
			 body:"results_from=0&results_to=10&search_string="
				
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
		 })
	 }
	 global_var(e,id){
		 window.edit_former=id;
	 }
	 search_former(e){
		 e.preventDefault();
		 var data = {
			search_string : e.target.search_field.value	 
		 }
		 
		 
		 fetch("http://127.0.0.1:3001/formers",{
		 method:"POST",
			 headers:{
				 "Accept":"text/plain",
				 "Content-Type":"application/x-www-form-urlencoded"
			 },
			 body:"results_from=0&results_to=10&search_string="+data.search_string+""
				
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
		 })
		 
	 }
		 
	 delete_row(e,former_id,row_id){
		 
		/*var data = {
			 username:e.target.username.value,
			 password:e.target.password.value
		 }*/

		 var conform_value = window.confirm("Are you sure want to delete");
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
 export default Add_Former;
 


 