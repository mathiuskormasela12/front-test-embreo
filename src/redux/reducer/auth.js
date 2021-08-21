// ========== Auth Reducer

const initialState = {
	token: null,
	role: null
};

const authReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'LOGIN': {
			return {
				...state,
				token: action.payload.token,
				role: action.payload.role
			}
		}

		default : {
			return {
				...state
			}
		}
	}
}

export default authReducer;