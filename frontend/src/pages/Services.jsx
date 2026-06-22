import { useEffect, useState } from 'react';
import { fetchServices } from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader';
import { Car, Wind, ShieldAlert, CloudRain, Shield, Sun, CheckCircle } from 'lucide-react';
import './Services.css';
import { Link } from 'react-router-dom';

const iconMap = {
  Car: <Car size={32} />,
  Wind: <Wind size={32} />,
  ShieldAlert: <ShieldAlert size={32} />,
  CloudRain: <CloudRain size={32} />,
  Shield: <Shield size={32} />,
  Sun: <Sun size={32} />
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vehicleType, setVehicleType] = useState('Sedan');

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  return (
    <div className="services-page">
      <div className="page-header">
        <div className="container">
          <h1 className="animate-fade-in">Our Premium Services</h1>
          <p className="animate-fade-in">Explore our wide range of professional car care services, designed to meet the highest standards of quality.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <div className="vehicle-selector card">
          <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Check Pricing for Your Vehicle</h3>
          <div className="type-buttons">
            {['Hatchback', 'Sedan', 'SUV', 'MUV', 'Luxury'].map(type => (
              <button 
                key={type} 
                className={`type-btn ${vehicleType === type ? 'active' : ''}`}
                onClick={() => setVehicleType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="services-grid">
            <SkeletonLoader count={6} height="350px" />
          </div>
        ) : (
          <div className="services-grid animate-fade-in">
            {services.map(service => (
              <div key={service._id} className="service-card glass-panel">
                <div className="service-icon">
                  {iconMap[service.icon] || <Car size={32} />}
                </div>
                <h3>{service.name}</h3>
                <p className="service-desc">{service.description}</p>
                <div className="service-details">
                  <span className="duration">Duration: {service.duration}</span>
                  <span className="price">₹{service.pricing[vehicleType]}</span>
                </div>
                <Link to="/book" className="btn btn-primary w-full" style={{ marginTop: '1.5rem' }}>Book {service.name}</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
