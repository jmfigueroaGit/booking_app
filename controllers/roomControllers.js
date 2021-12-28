import room from '../models/room';
import Room from '../models/room';
import ErrorHandler from '../utils/errorHandler';
import catchAsyncError from '../middlewares/catchAsyncError';
import APIFeatures from '../utils/apiFeatures';

const allRooms = catchAsyncError(async (req, res) => {
	const resPerPage = 4;
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

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
