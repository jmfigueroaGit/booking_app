import axios from 'axios';
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

// Register user
export const registerUser = (userData) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_USER_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post('/api/auth/register', userData, config);

		dispatch({
			type: REGISTER_USER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: REGISTER_USER_FAILED,
			payload: error.response.data.message,
		});
	}
};

// Loader user
export const loadUser = () => async (dispatch) => {
	try {
		dispatch({ type: LOAD_USER_REQUEST });

		const { data } = await axios.get('/api/me');

		dispatch({
			type: LOAD_USER_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: LOAD_USER_FAILED,
			payload: error.response.data.message,
		});
	}
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PROFILE_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.put('/api/me/update', userData, config);

		dispatch({
			type: UPDATE_PROFILE_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_PROFILE_FAILED,
			payload: error.response.data.message,
		});
	}
};

// Forgot Password Action
export const forgotPassword = (email) => async (dispatch) => {
	try {
		dispatch({ type: FORGOT_PASSWORD_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post('/api/password/forgot', email, config);

		dispatch({
			type: FORGOT_PASSWORD_SUCCESS,
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAILED,
			payload: error.response.data.message,
		});
	}
};

// Reset Password Action
export const resetPassword = (token, password) => async (dispatch) => {
	try {
		dispatch({ type: RESET_PASSWORD_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.put(
			`/api/password/reset/${token}`,
			password,
			config
		);

		dispatch({
			type: RESET_PASSWORD_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: RESET_PASSWORD_FAILED,
			payload: error.response.data.message,
		});
	}
};

// Get Admin Users
export const getAdminUsers = () => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_USERS_REQUEST });

		const { data } = await axios.get(`/api/admin/users`);

		dispatch({
			type: ADMIN_USERS_SUCCESS,
			payload: data.users,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_USERS_FAILED,
			payload: error.response.data.message,
		});
	}
};

// Get Admin Users
export const getUserDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/admin/users/${id}`);

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAILED,
			payload: error.response.data.message,
		});
	}
};

// Update User Details
export const updateUser = (id, userData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_USER_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.put(
			`/api/admin/users/${id}`,
			userData,
			config
		);

		dispatch({
			type: UPDATE_USER_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_USER_FAILED,
			payload: error.response.data.message,
		});
	}
};
// Delete User
export const deleteUser = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_USER_REQUEST });

		const { data } = await axios.delete(`/api/admin/users/${id}`);

		dispatch({
			type: DELETE_USER_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: DELETE_USER_FAILED,
			payload: error.response.data.message,
		});
	}
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERROR,
	});
};
