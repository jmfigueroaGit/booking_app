import {
	ALL_ROOM_SUCCESS,
	ALL_ROOM_FAILED,
	ROOM_DETAILS_SUCCESS,
	ROOM_DETAILS_FAILED,
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
