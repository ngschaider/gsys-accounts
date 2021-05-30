import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import UnauthedRoute from './components/UnauthedRoute';
import AuthedRoute from './components/AuthedRoute';
import UserCreate from './pages/UserCreate';
import UserUpdate from './pages/UserUpdate';

const App = () => {
	return (
		<Router>
			<Switch>
				<AuthedRoute path="/" exact component={Home} />
				<AuthedRoute path="/users/create" exact component={UserCreate} />
				<AuthedRoute path="/users/update/:id" exact component={UserUpdate} />
				<UnauthedRoute path="/login" exact component={Login} />
			</Switch>
		</Router>
	);
}

export default App;
