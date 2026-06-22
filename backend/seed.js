import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Service from './models/Service.js';
import Plan from './models/Plan.js';
import Booking from './models/Booking.js';

dotenv.config();

const services = [
  {
    name: 'Exterior Wash',
    icon: 'Car',
    description: 'Premium exterior hand wash, wheel cleaning, tire shine, and window streak-free finish.',
    duration: '30-45 mins',
    pricing: { Hatchback: 499, Sedan: 599, SUV: 799, MUV: 899, Luxury: 1299 }
  },
  {
    name: 'Interior Cleaning',
    icon: 'Wind',
    description: 'Deep vacuuming, dashboard conditioning, glass cleaning, and upholstery sanitization.',
    duration: '45-60 mins',
    pricing: { Hatchback: 599, Sedan: 699, SUV: 899, MUV: 999, Luxury: 1499 }
  },
  {
    name: 'Full Detailing',
    icon: 'ShieldAlert',
    description: 'Complete exterior polishing and interior deep cleaning with engine bay dressing.',
    duration: '3-4 hours',
    pricing: { Hatchback: 2999, Sedan: 3499, SUV: 4499, MUV: 4999, Luxury: 6999 }
  },
  {
    name: 'Steam Wash',
    icon: 'CloudRain',
    description: 'Eco-friendly high-pressure steam cleaning to sanitize and remove tough grime.',
    duration: '1-1.5 hours',
    pricing: { Hatchback: 999, Sedan: 1199, SUV: 1499, MUV: 1699, Luxury: 2499 }
  },
  {
    name: 'Ceramic Coating',
    icon: 'Shield',
    description: '9H hardness ceramic coating for ultimate paint protection, hydrophobic effect, and gloss shine.',
    duration: '1-2 days',
    pricing: { Hatchback: 14999, Sedan: 17999, SUV: 19999, MUV: 21999, Luxury: 29999 }
  },
  {
    name: 'Polish & Buff',
    icon: 'Sun',
    description: 'Machine polishing to remove swirl marks, minor scratches, and restore original paint gloss.',
    duration: '2-3 hours',
    pricing: { Hatchback: 1999, Sedan: 2499, SUV: 2999, MUV: 3499, Luxury: 4999 }
  }
];

const plans = [
  {
    name: 'Basic',
    price: 1499,
    features: ['2 Exterior Washes/month', '1 Interior Cleaning/month', '10% discount on detailing', 'Priority slot booking']
  },
  {
    name: 'Premium',
    price: 2999,
    features: ['4 Exterior Washes/month', '2 Interior Cleanings/month', '1 Steam Wash included', '15% discount on detailing', 'Free windshield polish']
  },
  {
    name: 'Elite',
    price: 5999,
    features: ['Unlimited Exterior Washes', '4 Interior Cleanings/month', '2 Steam Washes included', '1 Full Detailing package/year', '25% off Ceramic Coating', 'Free Pick & Drop']
  }
];

const bookings = [
  {
    bookingId: 'SPX-20260622-1001',
    customerName: 'John Doe',
    phone: '9876543210',
    email: 'john@example.com',
    service: 'Exterior Wash',
    vehicleType: 'Sedan',
    vehicleMake: 'Honda',
    vehicleModel: 'City',
    vehicleReg: 'KA-01-AB-1234',
    appointmentDate: new Date('2026-06-23T09:00:00Z'),
    timeSlot: '09:00 AM - 10:30 AM',
    amount: 599,
    status: 'Pending'
  },
  {
    bookingId: 'SPX-20260622-1002',
    customerName: 'Alice Smith',
    phone: '9876543211',
    email: 'alice@example.com',
    service: 'Full Detailing',
    vehicleType: 'SUV',
    vehicleMake: 'Hyundai',
    vehicleModel: 'Creta',
    vehicleReg: 'MH-12-CD-5678',
    appointmentDate: new Date('2026-06-24T10:30:00Z'),
    timeSlot: '10:30 AM - 12:00 PM',
    amount: 4499,
    status: 'Confirmed'
  },
  {
    bookingId: 'SPX-20260622-1003',
    customerName: 'Bob Johnson',
    phone: '9876543212',
    email: '',
    service: 'Ceramic Coating',
    vehicleType: 'Luxury',
    vehicleMake: 'BMW',
    vehicleModel: '3 Series',
    vehicleReg: 'DL-01-EF-9012',
    appointmentDate: new Date('2026-06-25T12:00:00Z'),
    timeSlot: '12:00 PM - 01:30 PM',
    amount: 29999,
    status: 'In Progress'
  },
  {
    bookingId: 'SPX-20260622-1004',
    customerName: 'Eva Green',
    phone: '9876543213',
    email: 'eva@example.com',
    service: 'Steam Wash',
    vehicleType: 'Hatchback',
    vehicleMake: 'Maruti Suzuki',
    vehicleModel: 'Swift',
    vehicleReg: 'TN-09-GH-3456',
    appointmentDate: new Date('2026-06-26T01:30:00Z'),
    timeSlot: '01:30 PM - 03:00 PM',
    amount: 999,
    status: 'Completed'
  },
  {
    bookingId: 'SPX-20260622-1005',
    customerName: 'Michael Brown',
    phone: '9876543214',
    email: '',
    service: 'Interior Cleaning',
    vehicleType: 'MUV',
    vehicleMake: 'Toyota',
    vehicleModel: 'Innova',
    vehicleReg: 'KA-05-IJ-7890',
    appointmentDate: new Date('2026-06-27T03:00:00Z'),
    timeSlot: '03:00 PM - 04:30 PM',
    amount: 999,
    status: 'Cancelled'
  }
];

const importData = async () => {
  try {
    await connectDB();
    await Service.deleteMany();
    await Plan.deleteMany();
    await Booking.deleteMany();

    await Service.insertMany(services);
    await Plan.insertMany(plans);
    await Booking.insertMany(bookings);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
