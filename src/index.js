// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Single from './components/Posts/Single';
import Search from './components/Posts/Search';
import Admin from './Admin';
import Create from './components/Admin/Create';
import Edit from './components/Admin/Edit';
import Delete from './components/Admin/Delete';


const routing = (
	<Router>
		<React.StrictMode>
			<Header />
			<Switch>
				<Route exact path="/" component={App} />
				<Route exact path="/admin" component={Admin} />
				<Route exact path="/admin/create" component={Create} />
				<Route exact path="/admin/edit/:id" component={Edit} />
				<Route exact path="/admin/delete/:id" component={Delete} />

				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<Route path="/logout" component={Logout}/>
				<Route path="/post/:slug" component={Single}/>
				<Route path="/search" component={Search}/>
			</Switch>
		</React.StrictMode>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();