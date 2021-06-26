import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import UnauthedRoute from './components/UnauthedRoute';
import AuthedRoute from './components/AuthedRoute';
import UserCreate from './pages/UserCreate';
import UserUpdate from './pages/UserUpdate';
import ServiceUsers from './pages/ServiceUsers';
import ServiceUserCreate from './pages/ServiceUserCreate';
import ServiceCreate from './pages/ServiceCreate';
import Services from './pages/Services';
import ServiceUpdate from './pages/ServiceUpdate';
import ServiceUserUpdate from './pages/ServiceUserUpdate';

const App = () => {
	return (
		<Router>
			<Switch>
				<AuthedRoute path="/" exact component={Home} />
				<AuthedRoute path="/users/create" exact component={UserCreate} />
				<AuthedRoute path="/users/update/:id" exact component={UserUpdate} />
				<AuthedRoute path="/serviceUsers/create" exact component={ServiceUserCreate} />
				<AuthedRoute path="/serviceUsers/update/:id" exact component={ServiceUserUpdate} />
				<AuthedRoute path="/serviceUsers/:id" exact component={ServiceUsers} />
				<AuthedRoute path="/service/create" exact component={ServiceCreate} />
				<AuthedRoute path="/service/update/:id" exact component={ServiceUpdate} />
				<AuthedRoute path="/service/:id" exact component={Services} />
				<UnauthedRoute path="/login" exact component={Login} />
			</Switch>
		</Router>
	);
}

export default App;
