// ========== Vendor Dashboard
// import all modules
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import events from '../services/Event';
import Swal from 'sweetalert2';
import appendForm from '../helpers/appendForm';

// import all actions
import { logout } from '../redux/action/auth';

// import all react boostrap components
import {
	Container,
	Table,
	Row,
	Col,
	Button,
	Form,
	Spinner
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
			selectedDate: null,
			events: [],
			event: null,
			message: null,
			loading: false,
			reason: '',
			refresh: false,
		}

		this.showModal = this.showModal.bind(this);
		this.handleAction = this.handleAction.bind(this);
		this.logout = this.logout.bind(this);
		this.getAllEvents = this.getAllEvents.bind(this);
		this.rejectEvent = this.rejectEvent.bind(this);
	}

	componentDidMount() {
		document.title = 'Dashboard - Vendor Admin';
		this.getAllEvents()
	}

	componentDidUpdate(prevProps, prevState) {
		
		if(this.state.refresh !== prevState.refresh) {
			this.getAllEvents()
		}
	}

	async rejectEvent(id) {
		const form = appendForm({
			reason: this.state.reason
		})

		try {
			await events.rejectEvent(this.props.auth.token, id, form)
			Swal.fire({
				title: 'Success',
				text: 'The event successfully to rejected',
				icon: 'success'
			})
			this.setState(currentState => ({
				refresh: !currentState.refresh
			}))
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

	async approveEvent(id) {
		const form = appendForm({
			date_event: this.state.selectedDate
		})

		try {
			await events.approveEvent(this.props.auth.token, id, form)
			Swal.fire({
				title: 'Success',
				text: 'The event successfully to approved',
				icon: 'success'
			})
			this.setState(currentState => ({
				refresh: !currentState.refresh
			}))
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
				<ModalDashboard show={this.state.show} onHide={() => this.showModal(false)} detail={this.state.event}>
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
									{
										this.state.event.date_event.map((item, index) => (
											<Fragment key={String(index)}>
												<Col xs="auto">
													<Form.Check
														type="radio"
														id={`date-${index}`}
														name="date"
														label={item.date}
														custom
														value={item.id_date_event}
														onChange={(e) => this.handleActionValue(e, 'selectedDate')}
													/>
												</Col>
											</Fragment>
										))
									}
								</Form.Row>
								{
									!this.state.selectedDate ? (
										<Button variant="info" className="mr-4 px-4" disabled>Submit</Button>
									) : (
										<Button variant="info" className="mr-4 px-4" type="button" onClick={() => this.approveEvent(this.state.event.id)}>Submit</Button>
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
										<Form.Control as="textarea" rows={3} onChange={(e) => this.handleActionValue(e, 'reason')} value={this.state.reason} placeholder="Type your reason for reject this event" />
									</Form.Group>
									<Form.Group>
									{
										this.state.reason.length < 1 ? (
											<Button variant="info" className="mr-4 px-4" disabled>Submit</Button>
										) : (
											<Button variant="info" className="mr-4 px-4" onClick={() => this.rejectEvent(this.state.event.id)}>Submit</Button>
										)
									}
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

export default connect(mapStateToProps, mapDispatchToProps)(VendorDashboard);