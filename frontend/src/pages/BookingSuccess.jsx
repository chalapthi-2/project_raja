import { useLocation, useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const BookingSuccess = () => {
  const { id } = useParams();
  const location = useLocation();
  const booking = location.state?.booking;

  return (
    <div className="container" style={{ padding: '6rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
      <div className="card text-center" style={{ maxWidth: '600px', width: '100%', padding: '3rem 2rem' }}>
        <CheckCircle size={80} color="var(--success-color)" style={{ margin: '0 auto 1.5rem auto' }} />
        <h1 style={{ marginBottom: '1rem', color: 'var(--success-color)' }}>Booking Confirmed!</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Thank you for choosing RV SplashX. Your appointment has been successfully scheduled.
        </p>

        <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'left', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Booking ID:</span>
            <strong style={{ color: 'var(--accent-color)' }}>{id}</strong>
          </div>
          {booking && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Service:</span>
                <strong>{booking.service}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Date:</span>
                <strong>{new Date(booking.appointmentDate).toDateString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Time Slot:</span>
                <strong>{booking.timeSlot}</strong>
              </div>
            </>
          )}
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          We have sent a confirmation email to you. Our admin team will also be notified.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-secondary">Back to Home</Link>
          <Link to="/services" className="btn btn-primary">View More Services</Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
