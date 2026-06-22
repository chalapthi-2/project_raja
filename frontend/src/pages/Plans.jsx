import { useEffect, useState } from 'react';
import { fetchPlans } from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Plans.css';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await fetchPlans();
        setPlans(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadPlans();
  }, []);

  return (
    <div className="plans-page">
      <div className="page-header">
        <div className="container">
          <h1 className="animate-fade-in">Subscription Plans</h1>
          <p className="animate-fade-in">Maintain that showroom shine year-round with our exclusive subscription packages.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        {loading ? (
          <div className="plans-grid">
            <SkeletonLoader count={3} height="400px" />
          </div>
        ) : (
          <div className="plans-grid animate-fade-in">
            {plans.map((plan, index) => (
              <div key={plan._id} className={`plan-card card ${index === 1 ? 'featured' : ''}`}>
                {index === 1 && <div className="featured-badge">Most Popular</div>}
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="currency">₹</span>
                    <span className="amount">{plan.price}</span>
                    <span className="period">/mo</span>
                  </div>
                </div>
                <div className="plan-features">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="feature-item">
                      <Check size={20} className="check-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="plan-footer">
                  <Link to="/book" className={`btn w-full ${index === 1 ? 'btn-primary' : 'btn-secondary'}`}>
                    Choose {plan.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Plans;
