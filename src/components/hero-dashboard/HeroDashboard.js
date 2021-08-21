// =========== Hero Login
// import all modules
import React, { Fragment } from 'react';

// import styled
import styled from './style.module.scss';

export function HeroDashboard(props) {
	return (
		<Fragment>
			<div className={`${styled.hero} bg-light py-5`}>
				{ props.children }
			</div>
		</Fragment>
	);
}