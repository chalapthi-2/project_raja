import { Droplets, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid var(--border-color)', padding: '4rem 0 2rem 0', marginTop: 'auto' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        
        <div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            <Droplets color="var(--accent-color)" size={28} />
            <span>RV SplashX</span>
          </Link>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Premium car wash and detailing services. We bring the showroom shine back to your vehicle with eco-friendly and advanced techniques.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><Link to="/services" style={{ color: 'var(--text-secondary)' }}>Our Services</Link></li>
            <li><Link to="/plans" style={{ color: 'var(--text-secondary)' }}>Subscription Plans</Link></li>
            <li><Link to="/book" style={{ color: 'var(--text-secondary)' }}>Book Appointment</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Contact Us</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', gap: '0.8rem', color: 'var(--text-secondary)' }}>
              <MapPin size={20} color="var(--accent-color)" />
              <span>123 Luxury Drive, Auto City, AC 45678</span>
            </li>
            <li style={{ display: 'flex', gap: '0.8rem', color: 'var(--text-secondary)' }}>
              <Phone size={20} color="var(--accent-color)" />
              <span>+1 (800) SPLASH-X</span>
            </li>
            <li style={{ display: 'flex', gap: '0.8rem', color: 'var(--text-secondary)' }}>
              <Mail size={20} color="var(--accent-color)" />
              <span>hello@rvsplashx.com</span>
            </li>
          </ul>
        </div>
        
      </div>
      <div className="container" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <p>&copy; {new Date().getFullYear()} RV SplashX. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
