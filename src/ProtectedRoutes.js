// ========== Protected Routes
// import all modules
import React, { Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import decode from 'jwt-decode';

function ProtectedRouter(props) {
	const CompanyComponent = props.companyComponent;
	const VendorComponent = props.vendorComponent;
	const auth = useSelector(currentState => currentState.auth);

	return (
		<Fragment>
			<Route {...props} render={({ location, ...rest }) => {
				if(auth.token) {
					if(Number(decode(auth.token).role) !== 1) {
						return (
							<VendorComponent {...rest} />
						);
					} else {
						return (
							<CompanyComponent {...rest} />
						);
					}
				} else {
					return (
						<Redirect 
							to={{
								pathname: '/login',
								state: {
									from: location
								}
							}}
						/>
					);
				}
			}} />
		</Fragment>
	);
}

export default ProtectedRouter;