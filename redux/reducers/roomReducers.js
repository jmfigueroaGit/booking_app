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
	ADMIN_ROOMS_REQUEST,
	ADMIN_ROOMS_SUCCESS,
	ADMIN_ROOMS_FAILED,
	NEW_ROOM_REQUEST,
	NEW_ROOM_SUCCESS,
	NEW_ROOM_FAILED,
	NEW_ROOM_RESET,
	UPDATE_ROOM_REQUEST,
	UPDATE_ROOM_SUCCESS,
	UPDATE_ROOM_FAILED,
	UPDATE_ROOM_RESET,
	DELETE_ROOM_REQUEST,
	DELETE_ROOM_SUCCESS,
	DELETE_ROOM_FAILED,
	DELETE_ROOM_RESET,
	CLEAR_ERROR,
} from '../constants/roomConstants';

// All rooms reducer
export const allRoomsReducer = (state = { rooms: [] }, action) => {
	switch (action.type) {
		case ADMIN_ROOMS_REQUEST:
			return {
				loading: true,
			};

		case ALL_ROOM_SUCCESS:
			return {
				roomsCount: action.payload.roomsCount,
				resPerPage: action.payload.resPerPage,
				filteredRoomsCount: action.payload.filteredRoomsCount,
				rooms: action.payload.rooms,
			};

		case ADMIN_ROOMS_SUCCESS:
			return {
				loading: false,
				rooms: action.payload,
			};

		case ALL_ROOM_FAILED:
		case ADMIN_ROOMS_FAILED:
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

// New Room
export const newRoomReducer = (state = { room: {} }, action) => {
	switch (action.type) {
		case NEW_ROOM_REQUEST:
			return {
				loading: true,
			};
		case NEW_ROOM_SUCCESS:
			return {
				loading: false,
				success: action.payload.success,
				room: action.payload.room,
			};
		case NEW_ROOM_RESET:
			return {
				success: false,
			};

		case NEW_ROOM_FAILED:
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

// Update room
export const roomReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_ROOM_REQUEST:
		case UPDATE_ROOM_REQUEST:
			return {
				loading: true,
			};
		case UPDATE_ROOM_SUCCESS:
			return {
				loading: false,
				isUpdated: action.payload,
			};

		case DELETE_ROOM_SUCCESS:
			return {
				loading: false,
				isDeleted: action.payload,
			};

		case DELETE_ROOM_RESET:
			return {
				loading: false,
				isDeleted: false,
			};

		case UPDATE_ROOM_RESET:
			return {
				isUpdated: false,
			};

		case DELETE_ROOM_FAILED:
		case UPDATE_ROOM_FAILED:
			return { isUpdated: false, error: action.payload };
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
