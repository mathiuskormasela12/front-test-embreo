// ========== Modal Dashboard
// import all components
import React, { Fragment } from 'react';

// import bootstrap components
import {
	Modal,
	Button,
	Container,
	Table
} from 'react-bootstrap';

export function ModalDashboard(props) {
	// const removeShadow = {
	// 	borderTopLeft: 'none',
	// 	borderTopRight: 'none',
	// 	borderBottomLeft: 'none',
	// 	borderBottomRight: 'none'
	// }

  if(props.show) {
		return (
			<Modal
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Event Details
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Table striped bordered hover size="md">
							<thead>
								<tr>
									<th>Event Name</th>
									<th>Vendor Name</th>
									<th>Confirmed Date</th>
									<th>Status</th>
									<th>Date Created</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{ props.detail.event_name }</td>
									<td>{ props.detail.vendor_name }</td>
									<td>
										{ 
											props.detail.date_event.some(item => item.status === 'approved') ? (
												props.detail.date_event.filter(item => item.status === 'approved')[0].date
											) : (
												props.detail.date_event.some(item => item.status === 'rejected') ? (
													props.detail.rejected_date
												) : (
													props.detail.date_event.map((item, index) => (
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
											props.detail.date_event.some(item => item.status === 'approved') ? (
												props.detail.date_event.filter(item => item.status === 'approved')[0].status
											) : (
												props.detail.date_event.some(item => item.status === 'rejected') ? (
													props.detail.date_event.filter(item => item.status === 'rejected')[0].status
												) : (
													props.detail.date_event.map((item, index) => (
														<Fragment key={String(index)}>
															<p>{ item.status }</p>
														</Fragment>
													))
												)
											)
										}
									</td>
									<td>{ props.detail.date_created }</td>
								</tr>
							</tbody>
						</Table>
						{ props.children }
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={props.onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	} else {
		return <Fragment></Fragment>
	}
}