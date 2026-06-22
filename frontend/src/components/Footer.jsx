import { Droplets, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid var(--border-color)', padding: '4rem 0 2rem 0', marginTop: 'auto' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        
        <div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', textDecoration: 'none' }}>
            <Droplets color="var(--accent-color)" size={28} />
            <span style={{ color: 'white' }}>SPLASH<span style={{ color: 'var(--accent-color)' }}>X</span></span>
          </Link>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Premium car wash & detailing studio in Vijayawada. Professional care, every time.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'white' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: 0 }}>
            <li><Link to="/services" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Our Services</Link></li>
            <li><Link to="/plans" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Subscription Plans</Link></li>
            <li><Link to="/book" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Book Appointment</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'white' }}>Contact Us</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0 }}>
            <li style={{ display: 'flex', gap: '0.8rem', color: 'var(--text-secondary)', alignItems: 'flex-start' }}>
              <MapPin size={20} color="var(--accent-color)" style={{ flexShrink: 0, marginTop: '4px' }} />
              <span style={{ lineHeight: '1.5' }}>Prathuru Road, beside Aparna Apartments, Tadepalle, Kunchanapalli, Tadepalle, Andhra Pradesh 522501</span>
            </li>
            <li style={{ display: 'flex', gap: '0.8rem', color: 'var(--text-secondary)', alignItems: 'center' }}>
              <Phone size={20} color="var(--accent-color)" />
              <a href="tel:+919182230364" style={{ color: 'inherit', textDecoration: 'none' }}>+91 91822 30364</a>
            </li>
            <li style={{ display: 'flex', gap: '0.8rem', color: 'var(--text-secondary)', alignItems: 'center' }}>
              <Mail size={20} color="var(--accent-color)" />
              <a href="mailto:dasarivamsi@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>dasarivamsi@gmail.com</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'white' }}>Follow Us</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <a href="https://www.instagram.com/rvcarcarestudio/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              Instagram
            </a>
            <a href="https://wa.me/919182230364" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              WhatsApp
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              Facebook
            </a>
          </div>
        </div>

      </div>
      
      <div style={{ textAlign: 'center', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '2rem', fontSize: '0.9rem' }}>
        <p>&copy; {new Date().getFullYear()} RV SplashX. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;