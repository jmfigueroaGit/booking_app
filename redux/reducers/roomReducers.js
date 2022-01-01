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

// All rooms reducers
export const allRoomsReducer = (state = { rooms: [] }, action) => {
	switch (action.type) {
		case ALL_ROOM_SUCCESS:
			return {
				roomsCount: action.payload.roomsCount,
				resPerPage: action.payload.resPerPage,
				filteredRoomsCount: action.payload.filteredRoomsCount,
				rooms: action.payload.rooms,
			};
		case ALL_ROOM_FAILED:
			return {
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

// Single room details reducers
export const roomDetailsReducer = (state = { room: {} }, action) => {
	switch (action.type) {
		case ROOM_DETAILS_SUCCESS:
			return {
				room: action.payload,
			};
		case ROOM_DETAILS_FAILED:
			return {
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

// Create single room review
export const newReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case NEW_REVIEW_REQUEST:
			return {
				loading: true,
			};
		case NEW_REVIEW_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			};
		case NEW_REVIEW_RESET:
			return {
				success: false,
			};

		case NEW_REVIEW_FAILED:
			return { success: false, error: action.payload };
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Check review availability
export const checkReviewReducer = (
	state = { reviewAvailable: null },
	action
) => {
	switch (action.type) {
		case REVIEW_AVAILABILITY_REQUEST:
			return {
				loading: true,
			};
		case REVIEW_AVAILABILITY_SUCCESS:
			return {
				loading: false,
				reviewAvailable: action.payload,
			};

		case REVIEW_AVAILABILITY_FAILED:
			return { success: false, error: action.payload };
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
