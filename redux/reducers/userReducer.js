import {
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILED,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAILED,
	CLEAR_ERROR,
} from '../constants/userConstants';

// Auth reducer
export const authReducer = (state = { user: null }, action) => {
	switch (action.type) {
		case REGISTER_USER_REQUEST:
			return {
				loading: true,
			};
		case LOAD_USER_REQUEST:
			return {
				loading: true,
				isAuthenticated: false,
			};
		case REGISTER_USER_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case LOAD_USER_SUCCESS:
			return {
				loading: false,
				isAuthenticated: true,
				user: action.payload,
			};
		case REGISTER_USER_FAILED:
			return { loading: false, error: action.payload };
		case LOAD_USER_FAILED:
			return { loading: false, isAuthenticated: false, error: action.payload };

		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
