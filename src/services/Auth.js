// ========== Auth Services
import http from './http';

class Auth {
	login(data) {
		return http(null).post('/auth/login', data)
	}
}

export default new Auth()