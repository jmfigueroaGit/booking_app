import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import {
	ALL_ROOM_SUCCESS,
	ALL_ROOM_FAILED,
	CLEAR_ERROR,
} from '../constants/roomConstants';

// Get All Rooms
export const getRooms = (req) => async (dispatch) => {
	try {
		const { origin } = absoluteUrl(req);

		const { data } = await axios.get(`${origin}/api/rooms`);

		dispatch({
			type: ALL_ROOM_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ALL_ROOM_FAILED,
			payload: error.response.data.message,
		});
	}
};

// Clear Errors
export const clearError = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERROR,
	});
};
