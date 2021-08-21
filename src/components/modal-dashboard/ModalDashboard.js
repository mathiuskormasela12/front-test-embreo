// ========== Modal Dashboard
// import all components
import React from 'react';

// import bootstrap components
import {
	Modal,
	Button,
	Container,
	Row,
	Col,
	ListGroup
} from 'react-bootstrap';

export function ModalDashboard(props) {
	const removeShadow = {
		'border-left': 'none',
		'border-right': 'none'
	}

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
        <Container fluid>
					<Row noGutters>
						<Col lg={4}>
							<ListGroup>
								<ListGroup.Item>Event Name</ListGroup.Item>
								<ListGroup.Item>Vendor Name</ListGroup.Item>
								<ListGroup.Item>Confirmed Date</ListGroup.Item>
								<ListGroup.Item>Status</ListGroup.Item>
								<ListGroup.Item>Date Created</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col lg={1}>
							<ListGroup>
								<ListGroup.Item style={removeShadow}>:</ListGroup.Item>
								<ListGroup.Item style={removeShadow}>:</ListGroup.Item>
								<ListGroup.Item style={removeShadow}>:</ListGroup.Item>
								<ListGroup.Item style={removeShadow}>:</ListGroup.Item>
								<ListGroup.Item style={removeShadow}>:</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col lg={7}>
							<ListGroup>
								<ListGroup.Item>Launching Embreo</ListGroup.Item>
								<ListGroup.Item>Embreo</ListGroup.Item>
								<ListGroup.Item>14 September 2020</ListGroup.Item>
								<ListGroup.Item>Approve</ListGroup.Item>
								<ListGroup.Item>10 June 2020</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
					{ props.children }
				</Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}