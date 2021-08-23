// ========== Company Dashboard
// import all modules
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import events from '../services/Event';
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
	Spinner
} from 'react-bootstrap';

// import all components
import {
	HeroDashboard,
	ModalDashboard
} from '../components';

class CompanyDashboard extends Component {
	constructor() {
		super();

		this.state = {
			show: false,
			events: [],
			event: null,
			message: null,
			loading: false,
		}

		this.showModal = this.showModal.bind(this);
		this.handleAction = this.handleAction.bind(this);
		this.logout = this.logout.bind(this);
		this.getAllEvents = this.getAllEvents.bind(this);
	}

	componentDidMount() {
		document.title = 'Dashboard - HR Admin';
		this.getAllEvents()
	}

	async getAllEvents() {
		this.setState((currentState) => ({
			loading: !currentState.loading
		}))
		try {
			const { data } = await events.getAllEvents(this.props.auth.token)
			
			this.setState((currentState) => ({
				events: data.results,
				message: null,
				loading: !currentState.loading
			}))
		} catch (err) {
			if(err.response) {
				this.setState(currentState => ({
					loading: !currentState.loading,
					events: [],
					message: err.response.data.message
				}))
			} else {
				this.setState(currentState => ({
					loading: !currentState.loading,
					events: [],
					message: err.message
				}))
			}
		}
	}

	showModal(show) {
		this.setState({
			show
		})
	}

	async getEventDetail(id) {
		try {
			const {data} = await events.getEventDetails(id, this.props.auth.token)
			this.setState({
				event: data.results
			})
			this.showModal(true)
		} catch (err) {
			if(err.response) {
				Swal.fire({
					title: 'Error',
					text: err.response.data.message,
					icon: 'error'
				})
			} else {
				Swal.fire({
					title: 'Error',
					text: err.message,
					icon: 'error'
				})
			}
		}
	}

	handleAction(prop) {
		this.setState(currentState => ({
			[prop]: !currentState[prop]
		}))
	}

	handleActionValue(e, prop) {
		this.setState({
			[prop]: e.target.value
		})
	}

	logout() {
		Swal.fire({
			title: 'Are you sure?',
			text: "You have to login again for use this app",
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
				<ModalDashboard show={this.state.show} onHide={() => this.showModal(false)} detail={this.state.event} />

				<HeroDashboard>
					<Container fluid>
						<Row className="mb-4 justify-content-center">
							<Col lg={11}>
								<header>
									<h2 className="font-weight-bold">Dashboard HR Admin</h2>
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
										{
											this.state.loading ? (
												<Fragment>
													<tr>
														<td colSpan="6" className="text-center">
															<Spinner animation="border" size="md" />
														</td>
													</tr>
												</Fragment>
											) : (
												(this.state.events.length > 0) ? (
													this.state.events.map((item, index) => (
														<Fragment key={String(index)}>
															<tr>
																<td>{ item.event_name }</td>
																<td>{ item.vendor_name }</td>
																<td>
																	{ 
																		item.date_event.some(item => item.status === 'approved') ? (
																			item.date_event.filter(item => item.status === 'approved')[0].date
																		) : (
																			item.date_event.some(item => item.status === 'rejected') ? (
																				item.rejected_date
																			) : (
																				item.date_event.map((item, index) => (
																					<Fragment key={String(index)}>
																						<p>{ item.date }</p>
																					</Fragment>
																				))
																			)
																		)
																	}
																</td>
																<td>
																{ 
																		item.date_event.some(item => item.status === 'approved') ? (
																			item.date_event.filter(item => item.status === 'approved')[0].status
																		) : (
																			item.date_event.some(item => item.status === 'rejected') ? (
																				item.date_event.filter(item => item.status === 'rejected')[0].status
																			) : (
																				item.date_event.map((item, index) => (
																					<Fragment key={String(index)}>
																						<p>{ item.status }</p>
																					</Fragment>
																				))
																			)
																		)
																	}
																</td>
																<td>{ item.date_created }</td>
																<td>
																	<Button variant="outline-primary" className="px-3" onClick={() => this.getEventDetail(item.id)}>View</Button>
																</td>
															</tr>
														</Fragment>
													))
												) : (
													<tr>
														<td colSpan="6" className="text-center">No data</td>
													</tr>
												)
											)
										}
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

const mapStateToProps = (currentState) => ({
	...currentState
})

const mapDispatchToProps = {
	logout
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDashboard);