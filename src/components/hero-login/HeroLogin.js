// =========== Hero Login
// import all modules
import React, { Fragment } from 'react';

// import styled
import styled from './style.module.scss';

export function HeroLogin(props) {
	return (
		<Fragment>
			<div className={`${styled.hero} bg-primary d-flex align-items-center`}>
				{ props.children }
			</div>
		</Fragment>
	);
}