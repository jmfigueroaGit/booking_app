import { MDBDataTable } from 'mdbreact';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import easyinvoice from 'easyinvoice';

import Loader from '../layout/Loader';

import {
	getAdminBookings,
	deleteAdminBooking,
	clearErrors,
} from '../../redux/actions/bookingAction';
import { DELETE_BOOKING_RESET } from '../../redux/constants/bookingConstants';

const AllBookings = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { bookings, error, loading } = useSelector((state) => state.bookings);
	const { isDeleted, error: deleteError } = useSelector(
		(state) => state.booking
	);

	useEffect(() => {
		dispatch(getAdminBookings());
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (deleteError) {
			toast.error(deleteError);
			dispatch(clearErrors());
		}
		if (isDeleted) {
			router.push('/admin/bookings');
			dispatch({ type: DELETE_BOOKING_RESET });
		}
	}, [dispatch, error, deleteError, isDeleted, router]);

	const setBookings = () => {
		const data = {
			columns: [
				{
					label: 'Booking ID',
					field: 'id',
					sort: 'asc',
				},
				{
					label: 'Check In',
					field: 'checkIn',
					sort: 'asc',
				},
				{
					label: 'Check Out',
					field: 'Date',
					sort: 'asc',
				},
				{
					label: 'Amount Paid',
					field: 'amount',
					sort: 'asc',
				},
				{
					label: 'Actions',
					field: 'actions',
					sort: 'asc',
				},
			],
			rows: [],
		};

		bookings &&
			bookings.forEach((booking) => {
				data.rows.push({
					id: booking._id,
					checkIn: new Date(booking.checkInDate).toLocaleString('en-US'),
					checkOut: new Date(booking.checkOutDate).toLocaleString('en-US'),
					amount: `$${booking.amountPaid}`,
					actions: (
						<>
							<Link href={`/admin/bookings/${booking._id}`}>
								<a className="btn btn-primary">
									<i className="fa fa-eye"></i>
								</a>
							</Link>
							<button
								className="btn btn-success mx-2"
								onClick={() => downloadInvoice(booking)}
							>
								<i className="fa fa-download"></i>
							</button>

							<button
								className="btn btn-danger mx-2"
								onClick={() => deleteRoomHandler(booking._id)}
							>
								<i className="fa fa-trash"></i>
							</button>
						</>
					),
				});
			});

		return data;
	};

	const deleteRoomHandler = (id) => {
		dispatch(deleteAdminBooking(id));
	};

	const downloadInvoice = async (booking) => {
		const data = {
			documentTitle: 'Booking INVOICE', //Defaults to INVOICE
			currency: 'USD',
			taxNotation: 'vat', //or gst
			marginTop: 25,
			marginRight: 25,
			marginLeft: 25,
			marginBottom: 25,
			images: {
				logo: 'https://res.cloudinary.com/bookit/image/upload/v1617904918/bookit/bookit_logo_cbgjzv.png',
			},
			sender: {
				company: 'Book IT',
				address: '13th Street. 47 W 13th St',
				zip: '10001',
				city: 'New York',
				country: 'United States',
			},
			client: {
				company: `${booking.user.name}`,
				address: `${booking.user.email}`,
				zip: '4567 CD',
				city: 'Client city',
				country: 'Client country',
			},
			information: {
				number: `${booking._id}`,
				date: `${new Date(Date.now()).toLocaleString('en-US')}`,
				'due-date': `${new Date(booking.checkOutDate).toLocaleString('en-US')}`,
			},
			products: [
				{
					quantity: `${booking.daysOfStay}`,
					description: `${booking.room.name}`,
					'tax-rate': 0,
					price: booking.room.pricePerNight,
				},
			],
			'bottom-notice':
				'This is auto generated Invoice of your booking on Book IT.',
		};

		const result = await easyinvoice.createInvoice(data);
		easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf);
	};
	return (
		<div className="container container-fluid">
			{loading ? (
				<Loader />
			) : (
				<>
					<h1 className="my-5">{`${bookings && bookings.length} Bookings`}</h1>

					<MDBDataTable
						data={setBookings()}
						className="px-3"
						bordered
						striped
						hover
					/>
				</>
			)}
		</div>
	);
};

export default AllBookings;
