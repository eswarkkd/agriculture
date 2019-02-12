 import React, {Component} from 'react';
 import Header from './header';
 import {BrowserRouter as Router, Route,Link,Redirect} from 'react-router-dom'; 
 class Pays extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: [],
			total_records:0,
			formers_list:[],
			purchases_list:[]
		}
		

	}
	 render(){
		 return(
		<div className="container-fluid main_div_new">
		 
			<div className="row no-margin"><div className="col-sm-12 no_padding"><div className="header_class">మన దళారి</div></div></div>
			<div className="row no-margin">
				<div className="col-sm-2 no_padding"><Header selected_menu="pays" /></div>
				<div className="col-sm-10 text-center">
				<div><h3>Pays</h3></div>
				
				<div className="row m-1">
				<div className="col-sm-6 col-6 text-left no_padding"><b>Total Records {this.state.total_records}</b></div>
				<div className="col-sm-6 col-6 text-right">{/*<Link to="/add_pay" className="btn btn-primary btn-sm">Add Pay</Link>*/}</div>
				</div>
				
				<div className="row m-1">
				<div className="col-sm-12 col-12 text-right">
				{/*<form action="search_former" onSubmit={this.search.bind(this)}>
					<div className="overflow_class">
					<div className="float_right m-1"><input type="submit" name="submit" value="Search" className="btn btn-primary btn-sm" /></div>
						<div className="float_right m-1">
						<select name="search_field" className="form-control form-control-sm">
						<option value="">All</option>
						{(this.state.formers_list)?this.state.formers_list.map((item,i)=>(<option value={item.id} key={i}>{item.first_name} {item.last_name}</option>)):""}
							
						</select>
						</div>
						
						
					</div>
				</form>*/}
				</div>
				</div>
				
				<div className="tablel-responsive">
					<table className="table table-bordered table-striped table_class">
					<tbody>
					<tr>
						<th width="5%">S.No</th>
						<th width="45%">Former Name</th>
						<th width="20%">Purchase Name</th>
						<th width="10%">Description</th>
						<th width="10%">Amount</th>
						<th width="10%">Options</th>
					</tr>
					{(this.state.data)?this.state.data.map((pay,i)=>(
					<tr key={i}>
						<td>{i+1}</td>
						<td>{pay.first_name} {pay.last_name}</td>
						<td>{pay.description}</td>
						<td>{pay.description}</td>
						<td>{pay.amount}</td>
						<td>{/*<Link to="edit_purchase" onClick={(e)=>this.global_var(e,pay.id)}><span className="edit_button"></span></Link> */}
						<span className="close_button" onClick={(e)=>this.delete_row(e,pay.id,i)}></span>
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
		fetch("http://127.0.0.1:3001/pays",{
		 method:"POST",
			 headers:{
				 "Accept":"text/plain",
				 "Content-Type":"application/x-www-form-urlencoded"
			 },
			 body:"results_from=0&results_to=100&search_string=&"
				
		 })
		 .then(function(response){
			 
			 return response.json();
		 })
		 .then((responsive_data)=>{
			 if(responsive_data.status==1){
				 this.setState({data:responsive_data.results});
				 this.setState({total_records:responsive_data.total});
			 }else{
				 
			 }
		 })
		 
		 // formers list
		 fetch("http://127.0.0.1:3001/get_formers",{
		 method:"POST",
			 headers:{
				 "Accept":"text/plain",
				 "Content-Type":"application/x-www-form-urlencoded"
			 },
			 body:"results_from=0&results_to=100&search_string=&"
				
		 })
		 .then(function(response){
			 
			 return response.json();
		 })
		 .then((responsive_data)=>{
			 if(responsive_data.status==1){
				 this.setState({formers_list:responsive_data.formers});
			 }else{
				 
			 }
		 })
		 
		 
		 
		 
	 }
	 global_var(e,id){
		 window.edit_purchase=id;
	 }
	 search(e){
		 e.preventDefault();
		 var data = {
			search_string : e.target.search_field.value	 
		 }
		 
		 
		 fetch("http://127.0.0.1:3001/pays",{
		 method:"POST",
			 headers:{
				 "Accept":"text/plain",
				 "Content-Type":"application/x-www-form-urlencoded"
			 },
			 body:"results_from=0&results_to=100&search_string="+data.search_string+""
				
		 })
		 .then(function(response){
			 
			 return response.json();
		 })
		 .then((responsive_data)=>{
			 if(responsive_data.status==1){
				 this.setState({data:responsive_data.results});
				 this.setState({total_records:responsive_data.total});
			 }else{
				 
			 }
		 })
		 
	 }
		 
	 delete_row(e,pay_id,row_id){
		 alert(pay_id);
		/*var data = {
			 username:e.target.username.value,
			 password:e.target.password.value
		 }*/

		 var conform_value = window.confirm("Are you sure want to delete");
		 if(!conform_value){
			 return false;
		 }
	
		fetch("http://127.0.0.1:3001/delete_pay",{
		 method:"POST",
			 headers:{
				 "Accept":"text/plain",
				 "Content-Type":"application/x-www-form-urlencoded"
			 },
			 body:"pay_id="+pay_id+""
				
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
 export default Pays;
 


 