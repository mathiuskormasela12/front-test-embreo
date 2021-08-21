// ========== Router
// import all components
import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistedStore from './redux/store';
import ProtectedRouter from './ProtectedRoutes';

// import all views
import VendorDashboard from './views/VendorDashboard';
import CompanyDashboard from './views/CompanyDashboard';
import Login from './views/Login';

function Router() {
	const { store, persistor } = persistedStore();

	return (
		<Fragment>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<BrowserRouter>
						<Switch>
							<ProtectedRouter path="/" exact companyComponent={CompanyDashboard} vendorComponent={VendorDashboard} />
							<Route path="/login" component={Login} />
						</Switch>
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</Fragment>
	);
}

export default Router;