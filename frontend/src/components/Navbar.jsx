import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Droplets } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Plans', path: '/plans' },
    { name: 'Admin', path: '/admin' } // Added for easy access during testing
  ];

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <Droplets className="logo-icon" size={28} />
          <span>RV SplashX</span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/book" className="btn btn-primary nav-btn">Book Now</Link>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu animate-fade-in">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="mobile-link"
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/book" className="btn btn-primary w-full" style={{ marginTop: '1rem' }} onClick={closeMenu}>
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
