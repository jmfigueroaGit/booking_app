import { combineReducers } from 'redux';

import {
	allRoomsReducer,
	roomDetailsReducer,
	newReviewReducer,
	checkReviewReducer,
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
	bookingReducers,
	bookingDetailsReducers,
} from './bookingReducers';
const reducer = combineReducers({
	allRooms: allRoomsReducer,
	roomDetails: roomDetailsReducer,
	auth: authReducer,
	user: userReducer,
	loadedUser: loadedUserReducer,
	forgotPassword: forgotPasswordReducer,
	checkBooking: checkBookingReducer,
	bookedDates: bookedDatesReducers,
	bookings: bookingReducers,
	bookingDetails: bookingDetailsReducers,
	newReview: newReviewReducer,
	checkReview: checkReviewReducer,
});

export default reducer;
