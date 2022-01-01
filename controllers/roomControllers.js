import Room from '../models/room';
import ErrorHandler from '../utils/errorHandler';
import catchAsyncError from '../middlewares/catchAsyncError';
import APIFeatures from '../utils/apiFeatures';
import Booking from '../models/booking';

const allRooms = catchAsyncError(async (req, res) => {
	const resPerPage = 2;
	const roomsCount = await Room.countDocuments();

	const apiFeature = new APIFeatures(Room.find(), req.query)
		.search()
		.filter()
		.pagination(resPerPage);

	let rooms = await apiFeature.query;
	let filteredRoomsCount = rooms.length;

	res.status(200).json({
		success: true,
		roomsCount,
		resPerPage,
		filteredRoomsCount,
		rooms,
	});
});

// Create new room => /api/rooms
const newRoom = catchAsyncError(async (req, res) => {
	const room = await Room.create(req.body);

	res.status(201).json({
		success: true,
		room,
	});
});

// Get Room details => /api/rooms/:id
const getSingleRoom = catchAsyncError(async (req, res, next) => {
	const room = await Room.findById(req.query.id);

	if (!room) {
		return next(new ErrorHandler('Room not found with this ID', 404));
	}

	res.status(201).json({
		success: true,
		room,
	});
});

// Update Room details => /api/rooms/:id
const updateRoom = catchAsyncError(async (req, res) => {
	let room = await Room.findById(req.query.id);

	if (!room) {
		return next(new ErrorHandler('Room not found with this ID', 404));
	}

	room = await Room.findByIdAndUpdate(req.query.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(201).json({
		success: true,
		room,
	});
});

// Delete Room details => /api/rooms/:id
const deleteRoom = catchAsyncError(async (req, res) => {
	const room = await Room.findById(req.query.id);

	if (!room) {
		return next(new ErrorHandler('Room not found with this ID', 404));
	}

	await room.remove();

	res.status(201).json({
		success: true,
		message: 'Room is deleted',
	});
});

// Create a new Review => /api/reviews
const createRoomReview = catchAsyncError(async (req, res) => {
	const { rating, comment, roomId } = req.body;
	const review = {
		user: req.user._id,
		name: req.user.name,
		rating: Number(rating),
		comment,
	};
	const room = await Room.findById(roomId);

	const isReviewed = room.reviews.find(
		(r) => r.user.toString() === req.user._id.toString()
	);

	if (isReviewed) {
		room.reviews.forEach((review) => {
			if (review.user.toString() === req.user._id.toString()) {
				review.comment = comment;
				review.rating = rating;
			}
		});
	} else {
		room.reviews.push(review);
		room.numOfReviews = room.reviews.length;
	}

	room.rating =
		room.reviews.reduce((acc, item) => item.rating + acc, 0) /
		room.reviews.length;

	await room.save({ validateBeforeSave: false });

	res.status(201).json({
		success: true,
		message: 'Room is deleted',
	});
});

// Check Review availability => /api/reviews/check_review_availability
const checkReviewAvailability = catchAsyncError(async (req, res) => {
	const { roomId } = req.query;
	const bookings = await Booking.find({ user: req.user._id, room: roomId });

	let isReviewAvailable = false;
	if (bookings.length > 0) {
		isReviewAvailable = true;
	}
	res.status(201).json({
		success: true,
		isReviewAvailable,
	});
});

export {
	allRooms,
	newRoom,
	getSingleRoom,
	updateRoom,
	deleteRoom,
	createRoomReview,
	checkReviewAvailability,
};
