import React from 'react';
import './App.css';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from 'Container/App';
import configureStore from 'Store/configureStore';

const MainApp = () => (
	<Provider store={configureStore()}>
			<Router>
				<Switch>
					<Route path="/" component={App} />
				</Switch>
			</Router>
	</Provider>
);

export default MainApp;
