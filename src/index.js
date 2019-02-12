import React from 'react';
import ReactDOM from 'react-dom';

import Login from './components/login';
import Dashboard from './components/dashboard';
import Formers from './components/formers';
import Add_Former from './components/add_former';
import Edit_Former from './components/edit_former';
import Purchases from './components/purchases';
import Add_Purchase from './components/add_purchase';
import Edit_Purchase from './components/edit_purchase';
import Pays from './components/pays';

import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';
import App from './App';
ReactDOM.render(
<Router>
<div>
	<Route path="/" exact component = {App} />
	<Route path="/login" component = {Login} />
	<Route path="/dashboard" component = {Dashboard} />
	<Route path="/formers" component = {Formers} />
	<Route path="/add_former" component = {Add_Former} />
	<Route path="/edit_former" component = {Edit_Former} />
	<Route path="/purchases" component = {Purchases} />
	<Route path="/add_purchase" component = {Add_Purchase} />
	<Route path="/edit_purchase" component = {Edit_Purchase} />
	<Route path="/pays" component = {Pays} />
</div>
</Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

