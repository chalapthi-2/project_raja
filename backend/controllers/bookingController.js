import Booking from '../models/Booking.js';
import { sendAdminBookingEmail, sendCustomerBookingEmail } from '../utils/email.js';

// Generate a random 4-digit number
const generateRandomDigits = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public (Admin)
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Public
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res) => {
  try {
    const {
      customerName, phone, email, service, vehicleType,
      vehicleMake, vehicleModel, vehicleReg, appointmentDate,
      timeSlot, amount, notes
    } = req.body;

    // Generate Booking ID: SPX-YYYYMMDD-XXXX (using appointment date)
    const dateObj = new Date(appointmentDate);
    const dateStr = dateObj.toISOString().split('T')[0].replace(/-/g, '');
    const bookingId = `SPX-${dateStr}-${generateRandomDigits()}`;

    const booking = new Booking({
      bookingId, customerName, phone, email, service, vehicleType,
      vehicleMake, vehicleModel, vehicleReg, appointmentDate,
      timeSlot, amount, notes, status: 'Pending'
    });

    const createdBooking = await booking.save();

    // Wait for emails to send before responding (required for Serverless functions like Vercel)
    try {
      await sendCustomerBookingEmail(createdBooking);
      await sendAdminBookingEmail(createdBooking);
    } catch (emailError) {
      console.error('Emails failed to send, but booking succeeded:', emailError);
    }

    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Public (Admin)
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      booking.status = status || booking.status;
      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Public (Admin)
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (booking) {
      res.json({ message: 'Booking removed' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
