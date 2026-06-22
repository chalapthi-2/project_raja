import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock, ThumbsUp } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content animate-fade-in">
          <h1 className="hero-title">Experience the Ultimate <br/><span className="text-gradient">Showroom Shine</span></h1>
          <p className="hero-subtitle">Premium car wash and detailing services tailored to perfection. Book your slot today and let your car gleam.</p>
          <div className="hero-actions">
            <Link to="/book" className="btn btn-primary btn-lg">Book Now <ArrowRight size={20}/></Link>
            <Link to="/services" className="btn btn-secondary btn-lg glass-btn">Explore Services</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section container">
        <div className="feature-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon"><Shield size={32} /></div>
            <h3>Premium Products</h3>
            <p>We use top-tier, eco-friendly chemicals that protect your car's paint.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon"><Clock size={32} /></div>
            <h3>Time Efficient</h3>
            <p>Punctual service delivery without compromising on quality.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon"><ThumbsUp size={32} /></div>
            <h3>Satisfaction Guaranteed</h3>
            <p>100% money-back guarantee if you aren't completely satisfied.</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="container">
          <h2 className="section-title text-center">What Our Clients Say</h2>
          <div className="review-grid">
            {[
              { name: "Sarah L.", role: "BMW Owner", text: "Incredible detailing work! My 3 Series looks brand new. The ceramic coating is totally worth it.", rating: 5 },
              { name: "Mike D.", role: "SUV Enthusiast", text: "Fast, professional, and excellent customer service. The online booking process was super smooth.", rating: 5 },
              { name: "Emily R.", role: "Daily Commuter", text: "I subscribe to the Premium plan and it saves me so much time. Highly recommend RV SplashX!", rating: 5 }
            ].map((review, i) => (
              <div key={i} className="review-card card">
                <div className="stars">
                  {[...Array(review.rating)].map((_, j) => <Star key={j} size={18} fill="var(--accent-color)" color="var(--accent-color)" />)}
                </div>
                <p className="review-text">"{review.text}"</p>
                <div className="review-author">
                  <h4>{review.name}</h4>
                  <span>{review.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container text-center">
          <h2>Ready to give your car the treatment it deserves?</h2>
          <p>Join hundreds of satisfied customers.</p>
          <Link to="/book" className="btn btn-primary btn-lg" style={{ marginTop: '2rem' }}>Book Your Wash Today</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
