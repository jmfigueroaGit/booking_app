import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import {
	ALL_ROOM_SUCCESS,
	ALL_ROOM_FAILED,
	ROOM_DETAILS_SUCCESS,
	ROOM_DETAILS_FAILED,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_SUCCESS,
	NEW_REVIEW_FAILED,
	NEW_REVIEW_RESET,
	REVIEW_AVAILABILITY_REQUEST,
	REVIEW_AVAILABILITY_SUCCESS,
	REVIEW_AVAILABILITY_FAILED,
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

// Create room review
export const newReview = (reviewData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_REVIEW_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.put(`/api/reviews`, reviewData, config);

		dispatch({
			type: NEW_REVIEW_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: NEW_REVIEW_FAILED,
			payload: error.response.data.message,
		});
	}
};

export const checkReviewAvailability = (roomId) => async (dispatch) => {
	try {
		dispatch({ type: REVIEW_AVAILABILITY_REQUEST });

		const { data } = await axios.get(
			`/api/reviews/check_review_availability?roomId=${roomId}`
		);

		dispatch({
			type: REVIEW_AVAILABILITY_SUCCESS,
			payload: data.isReviewAvailable,
		});
	} catch (error) {
		dispatch({
			type: REVIEW_AVAILABILITY_FAILED,
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
