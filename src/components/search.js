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
				<div>
				<form action="search_former" onSubmit={this.search_former.bind(this)}>
					<div className="overflow_class">
					<div className="float_right m-1"><input type="submit" name="submit" value="Search" className="btn btn-primary btn-sm"  /></div>
						<div className="float_right m-1"><input type="text" name="search_field" className="form-control form-control-sm" onClick={this.props.onSearchResult} /></div>
						
						
					</div>
				</form>
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
	 search_former(e){
		 e.preventDefault();
		 var data = {
			search_string : e.target.search_field.value	 
		 }
		 
		 
		 fetch(this.props.url,{
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
 export default Add_Former;
 


 