import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import {
	ALL_ROOM_SUCCESS,
	ALL_ROOM_FAILED,
	ROOM_DETAILS_SUCCESS,
	ROOM_DETAILS_FAILED,
	CLEAR_ERROR,
} from '../constants/roomConstants';

// Get All Rooms
export const getRooms =
	(req, currentPage = 1, location = '', guests, category) =>
	async (dispatch) => {
		try {
			const { origin } = absoluteUrl(req);

			let link = `${origin}/api/rooms?page=${currentPage}&location=${location}`;

			if (guests) link = link.concat(`&guestCapacity=${guests}`);
			if (category) link = link.concat(`&category=${category}`);

			const { data } = await axios.get(link);

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

// Get Single Room Details
export const getRoomDetails = (req, id) => async (dispatch) => {
	try {
		const { origin } = absoluteUrl(req);

		const { data } = await axios.get(`${origin}/api/rooms/${id}`);

		dispatch({
			type: ROOM_DETAILS_SUCCESS,
			payload: data.room,
		});
	} catch (error) {
		dispatch({
			type: ROOM_DETAILS_FAILED,
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
