import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './styles.css';
import Login from './components/login';
import {Router, Route, Link, browserHistory,IndexRoute} from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="container no_padding main_div login_page_middle">
	  <div className="login_heading">మన దళారి</div>
		<br /><br /><br />
		<Login />
		
		<div className="footer_text">
		This ReactJs SPA (Single Page Application) Developed by Eswar. 
		</div>
	  </div>
	  
    );
  }
}

export default App;
