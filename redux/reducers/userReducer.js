import {
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILED,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAILED,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAILED,
	UPDATE_PROFILE_RESET,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILED,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILED,
	ADMIN_USERS_REQUEST,
	ADMIN_USERS_SUCCESS,
	ADMIN_USERS_FAILED,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAILED,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILED,
	UPDATE_USER_RESET,
	DELETE_USER_REQUEST,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAILED,
	DELETE_USER_RESET,
	CLEAR_ERROR,
} from '../constants/userConstants';

// Auth reducer
export const authReducer = (state = { user: null }, action) => {
	switch (action.type) {
		case REGISTER_USER_REQUEST:
			return {
				loading: true,
			};
		case REGISTER_USER_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case REGISTER_USER_FAILED:
			return { loading: false, error: action.payload };
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Load user reducer
export const loadedUserReducer = (
	state = { loading: true, user: null },
	action
) => {
	switch (action.type) {
		case LOAD_USER_REQUEST:
			return {
				loading: true,
				isAuthenticated: false,
			};
		case LOAD_USER_SUCCESS:
			return {
				loading: false,
				isAuthenticated: true,
				user: action.payload,
			};
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

// User reducer
export const userReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_USER_REQUEST:
		case UPDATE_PROFILE_REQUEST:
		case DELETE_USER_REQUEST:
			return {
				loading: true,
			};
		case UPDATE_USER_SUCCESS:
		case UPDATE_PROFILE_SUCCESS:
			return {
				loading: false,
				isUpdate: action.payload,
			};
		case DELETE_USER_SUCCESS:
			return {
				loading: false,
				isDeleted: action.payload,
			};
		case UPDATE_USER_RESET:
		case UPDATE_PROFILE_RESET:
			return {
				loading: false,
				isUpdate: false,
			};

		case DELETE_USER_RESET:
			return {
				loading: false,
				isDeleted: false,
			};
		case DELETE_USER_FAILED:
		case UPDATE_USER_FAILED:
		case UPDATE_PROFILE_FAILED:
			return { loading: false, error: action.payload };

		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Forgot Password
export const forgotPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
		case RESET_PASSWORD_REQUEST:
			return {
				loading: true,
			};

		case FORGOT_PASSWORD_SUCCESS:
			return {
				loading: false,
				message: action.payload,
			};

		case RESET_PASSWORD_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			};

		case FORGOT_PASSWORD_FAILED:
		case RESET_PASSWORD_FAILED:
			return {
				loading: false,
				error: action.payload,
			};

		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

// Load user reducer
export const allUsersReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case ADMIN_USERS_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_USERS_SUCCESS:
			return {
				loading: false,
				users: action.payload,
			};
		case ADMIN_USERS_FAILED:
			return { loading: false, error: action.payload };

		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// User Details Admin
export const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case USER_DETAILS_SUCCESS:
			return {
				loading: false,
				user: action.payload,
			};
		case USER_DETAILS_FAILED:
			return { loading: false, error: action.payload };

		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
