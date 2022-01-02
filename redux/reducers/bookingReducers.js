import {
	CHECK_BOOKING_REQUEST,
	CHECK_BOOKING_SUCCESS,
	CHECK_BOOKING_FAILED,
	CHECK_BOOKING_RESET,
	BOOKED_DATES_SUCCESS,
	BOOKED_DATES_FAILED,
	MY_BOOKINGS_SUCCESS,
	MY_BOOKINGS_FAILED,
	BOOKING_DETAILS_SUCCESS,
	BOOKING_DETAILS_FAILED,
	ADMIN_BOOKINGS_REQUEST,
	ADMIN_BOOKINGS_SUCCESS,
	ADMIN_BOOKINGS_FAILED,
	DELETE_BOOKING_REQUEST,
	DELETE_BOOKING_SUCCESS,
	DELETE_BOOKING_FAILED,
	DELETE_BOOKING_RESET,
	CLEAR_ERROR,
} from '../constants/bookingConstants';

// Check Bookings
export const checkBookingReducer = (state = { available: null }, action) => {
	switch (action.type) {
		case CHECK_BOOKING_REQUEST:
			return {
				loading: true,
			};
		case CHECK_BOOKING_SUCCESS:
			return {
				loading: false,
				available: action.payload,
			};
		case CHECK_BOOKING_RESET:
			return {
				loading: false,
				available: null,
			};
		case CHECK_BOOKING_FAILED:
			return { loading: false, error: action.payload };
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Get All Booked Dates
export const bookedDatesReducers = (state = { dates: [] }, action) => {
	switch (action.type) {
		case BOOKED_DATES_SUCCESS:
			return {
				loading: false,
				dates: action.payload,
			};
		case BOOKED_DATES_FAILED:
			return { loading: false, error: action.payload };
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Get All Booked Dates
export const bookingsReducers = (state = { bookings: [] }, action) => {
	switch (action.type) {
		case ADMIN_BOOKINGS_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_BOOKINGS_SUCCESS:
		case MY_BOOKINGS_SUCCESS:
			return {
				loading: false,
				bookings: action.payload,
			};
		case ADMIN_BOOKINGS_FAILED:
		case MY_BOOKINGS_FAILED:
			return { loading: false, error: action.payload };
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Get All Booked Dates
export const bookingDetailsReducers = (state = { booking: {} }, action) => {
	switch (action.type) {
		case BOOKING_DETAILS_SUCCESS:
			return {
				loading: false,
				booking: action.payload,
			};
		case BOOKING_DETAILS_FAILED:
			return { loading: false, error: action.payload };
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Delete Booking
export const bookingReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_BOOKING_REQUEST:
			return {
				loading: true,
			};
		case DELETE_BOOKING_SUCCESS:
			return {
				loading: false,
				isDeleted: action.payload,
			};
		case DELETE_BOOKING_RESET:
			return {
				loading: false,
				isDeleted: false,
			};
		case DELETE_BOOKING_FAILED:
			return { loading: false, error: action.payload };
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
