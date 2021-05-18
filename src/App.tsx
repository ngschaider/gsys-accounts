import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UnauthedRoute from './components/UnauthedRoute';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Home} />
				<UnauthedRoute path="/login" exact component={Login} />
				<UnauthedRoute path="/register" exact component={Register} />
			</Switch>
		</Router>
	);
}

export default App;
