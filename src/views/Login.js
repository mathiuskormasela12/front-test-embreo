// ========== Login
// import all modules
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import auth from '../services/Auth';
import appendForm from '../helpers/appendForm';

// import actions
import { setToken } from '../redux/action/auth';

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
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		}

		this.handleInput = this.handleInput.bind(this)
		this.login = this.login.bind(this)
	}

	handleInput(name, e) {
		this.setState({
			[name]: e.target.value
		})
	}

	async login(e) {
		e.preventDefault()
		const form = appendForm({
			username: this.state.username,
			password: this.state.password
		})

		try {
			const { data } = await auth.login(form)
			this.props.setToken(data.results.token)
			Swal.fire({
				title: 'Success',
				text: data.message,
				icon: 'success'
			})
			setTimeout(() => {
				this.props.history.push('/')
			}, 1000)
		} catch (err) {
			if(err.response) {
				return Swal.fire({
					title: 'Error',
					text: err.response.data.message,
					icon: 'error'
				})
			} else {
				return Swal.fire({
					title: 'Error',
					text: err.message,
					icon: 'error'
				})
			}
		}
	}

	componentDidMount() {
		document.title = 'Login'
	}

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
											<Form onSubmit={this.login}>
												<Form.Group>
													<Form.Label htmlFor="username">Username</Form.Label>
													<Form.Control type="text" id="username" placeholder="Enter username" onChange={(e) => this.handleInput('username', e)} />
												</Form.Group>
												<Form.Group>
													<Form.Label htmlFor="password">Password</Form.Label>
													<Form.Control type="password" id="password" placeholder="Password" onChange={(e) => this.handleInput('password', e)} />
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

const mapDispatchToProps = {
	setToken
}

export default connect(null, mapDispatchToProps)(Login);