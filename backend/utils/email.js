import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const createTransporter = () => {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false
      }
    });
  }
  return null;
};

const transporter = createTransporter();

export const sendAdminBookingEmail = async (booking) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'rvcarstudio@gmail.com';
  
  const mailOptions = {
    from: process.env.SMTP_USER || 'no-reply@rvsplashx.com',
    to: adminEmail,
    subject: `New Booking Received: ${booking.bookingId} - RV SplashX`,
    text: `
      New Booking Received - RV SplashX
      ---------------------------------
      Booking ID: ${booking.bookingId}
      Customer Name: ${booking.customerName}
      Phone: ${booking.phone}
      Email: ${booking.email || 'N/A'}
      Service: ${booking.service}
      Vehicle: ${booking.vehicleMake} ${booking.vehicleModel} (${booking.vehicleReg}) [${booking.vehicleType}]
      Appointment Date: ${new Date(booking.appointmentDate).toDateString()}
      Time Slot: ${booking.timeSlot}
      Amount: ₹${booking.amount}
      Notes: ${booking.notes || 'N/A'}
      
      Log in to Admin Dashboard for more details.
    `,
  };

  if (transporter) {
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Admin email sent successfully to ${adminEmail}`);
    } catch (error) {
      console.error(`Error sending admin email: ${error.message}`);
    }
  } else {
    console.log('--- MOCK EMAIL TO ADMIN ---');
    console.log(mailOptions.text);
    console.log('---------------------------');
  }
};

export const sendCustomerBookingEmail = async (booking) => {
  if (!booking.email) return;

  const mailOptions = {
    from: process.env.SMTP_USER || 'no-reply@rvsplashx.com',
    to: booking.email,
    subject: `Booking Confirmed: ${booking.bookingId} - RV SplashX`,
    text: `
      Dear ${booking.customerName},
      
      Your booking with RV SplashX is confirmed!
      
      Booking Summary:
      ---------------------------------
      Booking ID: ${booking.bookingId}
      Service: ${booking.service}
      Vehicle: ${booking.vehicleMake} ${booking.vehicleModel} (${booking.vehicleReg})
      Appointment Date: ${new Date(booking.appointmentDate).toDateString()}
      Time Slot: ${booking.timeSlot}
      Amount: ₹${booking.amount}
      
      Thank you for choosing RV SplashX. We look forward to serving you!
    `,
  };

  if (transporter) {
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Customer email sent successfully to ${booking.email}`);
    } catch (error) {
      console.error(`Error sending customer email: ${error.message}`);
    }
  } else {
    console.log('--- MOCK EMAIL TO CUSTOMER ---');
    console.log(mailOptions.text);
    console.log('------------------------------');
  }
};
