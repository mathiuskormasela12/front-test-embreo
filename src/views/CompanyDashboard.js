// ========== Company Dashboard
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
	Button
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
			show: false
		}

		this.logout = this.logout.bind(this);
		this.showModal = this.showModal.bind(this);
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

	showModal(show) {
		this.setState({
			show
		})
	}

	componentDidMount() {
		document.title = 'Dashboard - Company HR Admin'
	}

	render() {
		return (
			<Fragment>
				<ModalDashboard show={this.state.show} onHide={() => this.showModal(false)} />
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
								<Table striped bordered hover size="md" responsive>
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

export default connect(null, mapDispatchToProps)(CompanyDashboard);