// ========== Vendor Dashboard
// import all modules
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

// import all actions
import { logout } from '../redux/action/auth';

// import all react boostrap components
import {
	Container,
	Table,
	Row,
	Col,
	Button,
	Form
} from 'react-bootstrap';

// import all components
import {
	HeroDashboard,
	ModalDashboard
} from '../components';

class VendorDashboard extends Component {
	constructor() {
		super();

		this.state = {
			show: false,
			showRejectForm: false,
			showApproveForm: false,
			selectedDate: null
		}

		this.showModal = this.showModal.bind(this);
		this.handleAction = this.handleAction.bind(this);
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		document.title = 'Dashboard - Vendor Admin'
	}

	showModal(show) {
		this.setState({
			show
		})
	}

	handleAction(prop) {
		this.setState(currentState => ({
			[prop]: !currentState[prop]
		}))
	}

	handleActionValue(e, prop) {
		this.setState(currentState => ({
			[prop]: e.target.value
		}))
	}

	logout() {
		Swal.fire({
			title: 'Are you sure?',
			text: "You have to login again for use thia app",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Logout!'
		}).then((result) => {
			if (result.isConfirmed) {
				this.props.logout()
				Swal.fire(
					'Success',
					'Logout successfully',
					'success'
				)

				setTimeout(() => {
					this.props.history.push('/login')
				})
			}
		})
	}

	render() {
		return (
			<Fragment>
				<ModalDashboard show={this.state.show} onHide={() => this.showModal(false)}>
					<Row className="mt-4">
						<Col lg={12}>
							<Button variant="success" className="mr-4 px-4" onClick={() => this.handleAction('showApproveForm')}>Approve</Button>
							<Button variant="danger" className="px-4" onClick={() => this.handleAction('showRejectForm')}>Reject</Button>
						</Col>
					</Row>
					{
						this.state.showApproveForm && (
							<Fragment>
								<Form.Row className="my-4">
									<Col xs="auto">
										<Form.Check
											type="radio"
											id="date-1"
											name="date"
											label="21 July 2021"
											custom
											onChange={(e) => this.handleActionValue(e, 'selectedDate')}
										/>
									</Col>
									<Col xs="auto">
										<Form.Check
											type="radio"
											id="date-2"
											name="date"
											label="11 July 2021"
											custom
											onChange={(e) => this.handleActionValue(e, 'selectedDate')}
										/>
									</Col>
									<Col xs="auto">
										<Form.Check
											type="radio"
											id="date-3"
											name="date"
											label="30 July 2021"
											custom
											onChange={(e) => this.handleActionValue(e, 'selectedDate')}
										/>
									</Col>
								</Form.Row>
								{
									!this.state.selectedDate ? (
										<Button variant="info" className="mr-4 px-4" disabled>Submit</Button>
									) : (
										<Button variant="info" className="mr-4 px-4">Submit</Button>
									)
								}
							</Fragment>
						)
					}

					{
						this.state.showRejectForm && (
							<Fragment>
								<Form className="mt-3">
									<Form.Group controlId="exampleForm.ControlTextarea1">
										<Form.Label>Reason</Form.Label>
										<Form.Control as="textarea" rows={3} placeholder="Type your reason for reject this event" />
									</Form.Group>
								</Form>
							</Fragment>
						)
					}
				</ModalDashboard>
				<HeroDashboard>
					<Container fluid>
						<Row className="mb-4 justify-content-center">
							<Col lg={11}>
								<header>
									<h2 className="font-weight-bold">Dashboard Vendor Admin</h2>
								</header>
							</Col>
						</Row>
						<Row className="justify-content-center">
							<Col lg={11}>
								<Table striped bordered hover size="md">
									<thead>
										<tr>
											<th>Event Name</th>
											<th>Vendor Name</th>
											<th>Confirmed Date</th>
											<th>Status</th>
											<th>Date Created</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Launching Embreo</td>
											<td>Embreo</td>
											<td>14 September 2020</td>
											<td>Approve</td>
											<td>10 June 2020</td>
											<td>
												<Button variant="outline-primary" className="px-3" onClick={() => this.showModal(true)}>View</Button>
											</td>
										</tr>
									</tbody>
								</Table>
							</Col>
						</Row>
						<Row className="justify-content-center mt-3">
							<Col lg={11}>
								<Button variant="danger" onClick={this.logout}>Logout</Button>
							</Col>
						</Row>
					</Container>
				</HeroDashboard>
			</Fragment>
		);
	}
}

const mapDispatchToProps = {
	logout
}

export default connect(null, mapDispatchToProps)(VendorDashboard);