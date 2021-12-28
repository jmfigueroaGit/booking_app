import {
	ALL_ROOM_SUCCESS,
	ALL_ROOM_FAILED,
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
