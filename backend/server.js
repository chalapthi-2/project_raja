import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import serviceRoutes from './routes/serviceRoutes.js';
import planRoutes from './routes/planRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/services', serviceRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/bookings', bookingRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('RV SplashX API is running...');
});

// Test Email Route (To see errors directly in the browser)
app.get('/api/test-email', async (req, res) => {
  try {
    const { sendAdminBookingEmail } = await import('./utils/email.js');
    
    // Check if environment variables are set
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(400).json({ 
        error: 'SMTP_USER or SMTP_PASS is missing in Vercel Environment Variables.' 
      });
    }

    await sendAdminBookingEmail({
      bookingId: 'TEST-123',
      customerName: 'Test Email Verification',
      service: 'Test Service',
      appointmentDate: new Date(),
      timeSlot: '10:00 AM',
      amount: 999
    });
    
    res.json({ 
      success: true, 
      message: 'Test triggered! If you do not see the email, Vercel is blocking Gmail SMTP. Time to switch to Resend API.' 
    });
  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running in development mode on port ${PORT}`);
  });
}

export default app;
