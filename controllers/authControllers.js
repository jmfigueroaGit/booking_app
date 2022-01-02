import User from '../models/user';
import cloudinary from 'cloudinary';
import crypto from 'crypto';

import ErrorHandler from '../utils/errorHandler';
import catchAsyncError from '../middlewares/catchAsyncError';
import sendEmail from '../utils/sendEmail';

import absoluteUrl from 'next-absolute-url';

// Setting up cloudinary config
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Register user   =>   /api/auth/register
const registerUser = catchAsyncError(async (req, res) => {
	const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
		folder: 'bookit/avatars',
		width: '150',
		crop: 'scale',
	});

	const { name, email, password } = req.body;

	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: result.public_id,
			url: result.secure_url,
		},
	});

	res.status(200).json({
		success: true,
		message: 'Account Registered successfully',
	});
});

// Current user profile   =>   /api/me
const currentUserProfile = catchAsyncError(async (req, res) => {
	const user = await User.findById(req.user._id);

	res.status(200).json({
		success: true,
		user,
	});
});

// Update user profile   =>   /api/me/update
const updateProfile = catchAsyncError(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name;
		user.email = req.body.email;
		if (req.body.password) user.password = req.body.password;
	}

	if (req.body.avatar !== '') {
		const image_id = user.avatar.public_id;

		//Delete User previous image/avatar
		await cloudinary.v2.uploader.destroy(image_id);

		const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
			folder: 'bookit/avatars',
			width: '150',
			crop: 'scale',
		});

		user.avatar = {
			public_id: result.public_id,
			url: result.secure_url,
		};
	}

	await user.save();

	res.status(200).json({
		success: true,
	});
});

// Forgot password   =>   /api/password/forgot
const forgotPassword = catchAsyncError(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorHandler('User not found with this email', 404));
	}

	// Get reset token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	// Get origin
	const { origin } = absoluteUrl(req);

	// Create reset password url
	const resetUrl = `${origin}/password/reset/${resetToken}`;

	const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n\ If you have not requested this email, then ignore it.`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'BookIT Password Recovery',
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to: ${user.email}`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorHandler(error.message, 500));
	}
});

// Reset password   =>   /api/password/reset/:token
const resetPassword = catchAsyncError(async (req, res, next) => {
	// Hash URL Token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.query.token)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new ErrorHandler(
				'Password reset token is invalid or has been expired',
				404
			)
		);
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHandler('Password does not match', 400));
	}

	// Setup the new password
	user.password = req.body.password;

	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	res.status(200).json({
		success: true,
		message: 'Password Updated Successfully',
	});
});

// Get All Users   =>   /api/admin/users
const allAdminUsers = catchAsyncError(async (req, res) => {
	const users = await User.find();

	res.status(200).json({
		success: true,
		users,
	});
});

// Get User's Details  =>   /api/admin/users/:id
const getUserDetails = catchAsyncError(async (req, res) => {
	const user = await User.findById(req.query.id);

	if (!user) {
		return next(new ErrorHandler('User not found with this ID', 404));
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// Update User's Details  =>   /api/admin/users/:id
const updateUser = catchAsyncError(async (req, res) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
	};

	const user = await User.findByIdAndUpdate(req.query.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		user,
	});
});

// Delete User's Details  =>   /api/admin/users/:id
const deleteUser = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.query.id);

	if (!user) {
		return next(new ErrorHandler('User not found with this ID', 404));
	}

	// Remove avatar
	const image_id = user.avatar.public_id;

	await cloudinary.v2.uploader.destroy(image_id);

	await user.remove();

	res.status(200).json({
		success: true,
		user,
	});
});

export {
	registerUser,
	currentUserProfile,
	updateProfile,
	forgotPassword,
	resetPassword,
	allAdminUsers,
	getUserDetails,
	updateUser,
	deleteUser,
};
