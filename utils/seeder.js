const Room = require('../models/room');
const mongoose = require('mongoose');

const rooms = require('../data/rooms');

mongoose
	.connect(
		'mongodb+srv://dev061417:dev061417@maindb.qmybv.mongodb.net/mainDatabase?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then((con) => console.log('Connected to Local Database'));

const seedRooms = async () => {
	try {
		await Room.deleteMany();
		console.log('Rooms are deleted');

		await Room.insertMany(rooms);
		console.log('All Rooms are added');
		process.exit();
	} catch (error) {
		console.log(error.message);
		process.exit();
	}
};

seedRooms();
