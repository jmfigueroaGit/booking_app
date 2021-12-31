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
export const bookingReducers = (state = { bookings: [] }, action) => {
	switch (action.type) {
		case MY_BOOKINGS_SUCCESS:
			return {
				loading: false,
				bookings: action.payload,
			};
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
