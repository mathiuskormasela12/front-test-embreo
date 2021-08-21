// ========== Login
// import all modules
import React, { Component, Fragment } from 'react';

// import react-bootstrap components
import {
	Container,
	Card,
	Row,
	Col,
	Form,
	Button
} from 'react-bootstrap';

// import all components
import {
	HeroLogin
} from '../components';

class Login extends Component {
	render() {
		return (
			<Fragment>
				<HeroLogin>
					<Container fluid>
						<Row className="justify-content-center">
							<Col lg={3}>
								<Card className="pb-4 pt-2">
									<Card.Body>
										<Container>
											<h3 className="font-weight-bold text-center mb-3">Login</h3>
											<Form>
												<Form.Group>
													<Form.Label htmlFor="username">Username</Form.Label>
													<Form.Control type="text" id="username" placeholder="Enter username" />
												</Form.Group>
												<Form.Group>
													<Form.Label htmlFor="password">Password</Form.Label>
													<Form.Control type="password" id="password" placeholder="Password" />
												</Form.Group>
												<Button className="mt-4" variant="primary" type="submit" block>
													Login
												</Button>
											</Form>
										</Container>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Container>
				</HeroLogin>
			</Fragment>
		);
	}
}

export default Login;