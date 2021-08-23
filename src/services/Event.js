// ========== Event Services
import http from './http';

class Auth {
	getAllEvents(token) {
		return http(token).get('/event')
	}

	getEventDetails(id, token) {
		return http(token).get(`/event/${id}`)
	}

	rejectEvent(token, id, data) {
		return http(token).patch(`/event/reject/${id}`, data)
	}

	approveEvent(token, id, data) {
		return http(token).patch(`/event/approve/${id}`, data)
	}
}

export default new Auth()