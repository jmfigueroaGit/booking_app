module.exports = {
	reactStrictMode: true,
	env: {
		DB_LOCAL_URI:
			'mongodb+srv://dev061417:dev061417@maindb.qmybv.mongodb.net/mainDatabase?retryWrites=true&w=majority',
		CLOUDINARY_CLOUD_NAME: 'doauehsdl',
		CLOUDINARY_API_KEY: '472923137226572',
		CLOUDINARY_API_SECRET: '91RLckN0H6hWTLov0tVKYkE8_BE',
	},
	images: {
		domains: [
			'res.cloudinary.com',
			'i.pinimg.com',
			'encrypted-tbn0.gstatic.com',
		],
	},
};
