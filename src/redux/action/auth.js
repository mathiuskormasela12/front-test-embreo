// ========== Auth Actions

export const setToken = (token) => ({
	type: 'LOGIN',
	payload: {
		token
	}
})

export const logout = (token) => ({
	type: 'LOGOUT'
})