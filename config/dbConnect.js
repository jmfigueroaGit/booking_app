import mongoose from 'mongoose';

const dbConnect = () => {
	if (mongoose.connection.releaseState > 1) {
		return;
	}

	mongoose
		.connect(process.env.DB_LOCAL_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((con) => console.log('Connected to Local Database'));
};

export default dbConnect;
