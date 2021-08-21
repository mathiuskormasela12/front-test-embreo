// ========== Vendor Dashboard
// import all modules
import React, { Component, Fragment } from 'react';

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
	HeroDashboard
} from '../components';
class VendorDashboard extends Component {
	componentDidMount() {
		document.title = 'Dashboard - Vendor Admin'
	}

	render() {
		return (
			<Fragment>
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
												<Button variant="outline-primary" className="px-3">View</Button>
											</td>
										</tr>
									</tbody>
								</Table>
							</Col>
						</Row>
						<Row className="justify-content-center mt-3">
							<Col lg={11}>
								<Button variant="danger">Logout</Button>
							</Col>
						</Row>
					</Container>
				</HeroDashboard>
			</Fragment>
		);
	}
}

export default VendorDashboard;