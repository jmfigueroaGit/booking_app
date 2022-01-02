import { combineReducers } from 'redux';

import {
	allRoomsReducer,
	roomDetailsReducer,
	newReviewReducer,
	checkReviewReducer,
	newRoomReducer,
	roomReducer,
	roomReviewsReducer,
	reviewReducer,
} from './roomReducers';
import {
	authReducer,
	userReducer,
	loadedUserReducer,
	forgotPasswordReducer,
	allUsersReducer,
	userDetailsReducer,
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
	roomReviews: roomReviewsReducer,
	review: reviewReducer,
	auth: authReducer,
	user: userReducer,
	loadedUser: loadedUserReducer,
	allUsers: allUsersReducer,
	userDetails: userDetailsReducer,
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
