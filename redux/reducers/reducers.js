import { combineReducers } from 'redux';

import { allRoomsReducer, roomDetailsReducer } from './roomReducers';
import { authReducer } from './userReducer';
const reducer = combineReducers({
	allRooms: allRoomsReducer,
	roomDetails: roomDetailsReducer,
	auth: authReducer,
});

export default reducer;
