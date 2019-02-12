 import React, {Component} from 'react';
 import Header from './header';
 import {BrowserRouter as Router, Route,Link,Redirect} from 'react-router-dom'; 
 class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			message:"",
			status:"",
			formers_list:[]
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
						<div className="col-sm-12 m-2"><h3>Add Purchase</h3><br /></div>
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
											<div className="col-sm-2 label_class">Former Name</div>
											<div className="col-sm-2">
						<select name="former_name" className="form-control form-control-sm">
						{(this.state.formers_list)?this.state.formers_list.map((item,i)=>(<option value={item.id} key={i}>{item.first_name} {item.last_name}</option>)):""}							
						</select>
											</div>
											<div className="col-sm-2 label_class">Item Name</div>
											<div className="col-sm-2">
												<select name="item_name" className="form-control">
													<option value="dhanyam">Dhanyam</option>
													<option value="pratti">Pratti</option>
													<option value="pogaku">Pogaku</option>
													<option value="kuragayalu">Kuragayalu</option>
												</select>
											</div>
											<div className="col-sm-2 label_class">Qunatity Type</div>
											<div className="col-sm-2">
												<select name="quantity_type" className="form-control">
													<option value="bhastalu">Bastalu</option>
													<option value="qunta">Qunata</option>
													<option value="blads">Blads</option>
													<option value="kg">kg</option>
												</select>
											</div>
										</div>
									</div>
								</div>
								
								<div className="row">
									<div className="col-sm-12"><br />
										<div className="row">
											<div className="col-sm-2 label_class">Qunatity</div>
											<div className="col-sm-2">
												<input type="text" name="quantity" className="form-control" />
											</div>
											<div className="col-sm-2 label_class">Item Price</div>
											<div className="col-sm-2"><input type="text" name="item_price" className="form-control" /></div>
											<div className="col-sm-2 label_class">Amount</div>
											<div className="col-sm-2"><input type="text" name="amount" className="form-control" /></div>
										</div>
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
		// formers list
		 fetch("http://127.0.0.1:3001/get_formers",{
		 method:"POST",
			 headers:{
				 "Accept":"text/plain",
				 "Content-Type":"application/x-www-form-urlencoded"
			 },
			 body:"results_from=0&results_to=10&search_string=&"
				
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
	 submit_form(e){
		 e.preventDefault();
		 var data = {
			former_name : e.target.former_name.value,
			item_name: e.target.item_name.value,
			quantity : e.target.quantity.value,
			quantity_type : e.target.quantity_type.value,
			item_price : e.target.item_price.value,
			amount : e.target.amount.value
		 }
		 
		 
		 fetch("http://127.0.0.1:3001/add_purchase",{
		 method:"POST",
			 headers:{
				 "Accept":"text/plain",
				 "Content-Type":"application/x-www-form-urlencoded"
			 },
			 body:"former_id="+data.former_name+"&item_name="+data.item_name+"&quantity="+data.quantity+"&quantity_type="+data.quantity_type+"&item_price="+data.item_price+"&amount="+data.amount+"&"
				
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
 


 