module.exports = {
	reactStrictMode: true,
	env: {
		DB_LOCAL_URI:
			'mongodb+srv://dev061417:dev061417@maindb.qmybv.mongodb.net/mainDatabase?retryWrites=true&w=majority',
	},
	images: {
		domains: [
			'res.cloudinary.com',
			'i.pinimg.com',
			'encrypted-tbn0.gstatic.com',
		],
	},
};
