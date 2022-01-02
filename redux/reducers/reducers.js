import { combineReducers } from 'redux';

import {
	allRoomsReducer,
	roomDetailsReducer,
	newReviewReducer,
	checkReviewReducer,
	newRoomReducer,
	roomReducer,
} from './roomReducers';
import {
	authReducer,
	userReducer,
	loadedUserReducer,
	forgotPasswordReducer,
} from './userReducer';
import {
	checkBookingReducer,
	bookedDatesReducers,
	bookingsReducers,
	bookingReducer,
	bookingDetailsReducers,
} from './bookingReducers';
const reducer = combineReducers({
	allRooms: allRoomsReducer,
	roomDetails: roomDetailsReducer,
	newRoom: newRoomReducer,
	room: roomReducer,
	auth: authReducer,
	user: userReducer,
	loadedUser: loadedUserReducer,
	forgotPassword: forgotPasswordReducer,
	checkBooking: checkBookingReducer,
	bookedDates: bookedDatesReducers,
	bookings: bookingsReducers,
	booking: bookingReducer,
	bookingDetails: bookingDetailsReducers,
	newReview: newReviewReducer,
	checkReview: checkReviewReducer,
});

export default reducer;
