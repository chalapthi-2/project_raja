import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchServices, createBooking } from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import './Booking.css';

const Booking = ({ showToast }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    service: '',
    vehicleType: 'Sedan',
    vehicleMake: '',
    vehicleModel: '',
    vehicleReg: '',
    appointmentDate: '',
    timeSlot: '',
    notes: '',
  });

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        showToast('Error loading services', 'error');
      } finally {
        setLoading(false);
      }
    };
    getServices();
  }, [showToast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const selectedServiceObj = services.find(s => s.name === formData.service);
  const calculatedAmount = selectedServiceObj ? selectedServiceObj.pricing[formData.vehicleType] : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = { ...formData, amount: calculatedAmount };
      const response = await createBooking(payload);
      showToast('Booking Successful!');
      navigate(`/success/${response.bookingId}`, { state: { booking: response } });
    } catch (err) {
      showToast(err.message, 'error');
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = formData.customerName.trim() !== '' && formData.phone.trim().length >= 10;
  const isStep2Valid = formData.service !== '';
  const isStep3Valid = formData.vehicleType && formData.vehicleMake && formData.vehicleModel && formData.vehicleReg;
  const isStep4Valid = formData.appointmentDate && formData.timeSlot;

  // Date constraints: Next 30 days
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const timeSlots = [
    '09:00 AM - 10:30 AM', '10:30 AM - 12:00 PM', 
    '12:00 PM - 01:30 PM', '01:30 PM - 03:00 PM', 
    '03:00 PM - 04:30 PM', '04:30 PM - 06:00 PM'
  ];

  return (
    <div className="booking-page container">
      <div className="booking-header text-center">
        <h1>Book Your Appointment</h1>
        <p>Complete the steps below to secure your slot.</p>
      </div>

      <div className="booking-container">
        {/* Progress Bar */}
        <div className="stepper">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`step ${step >= s ? 'active' : ''}`}>
              <div className="step-circle">{step > s ? <CheckCircle size={16} /> : s}</div>
            </div>
          ))}
        </div>

        <div className="booking-content card">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="step-panel animate-fade-in">
              <h2>1. Contact Details</h2>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input type="text" className="form-input" name="customerName" value={formData.customerName} onChange={handleInputChange} placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <input type="tel" className="form-input" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="9876543210" />
              </div>
              <div className="form-group">
                <label className="form-label">Email (Optional)</label>
                <input type="email" className="form-input" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" />
              </div>
              <div className="step-actions">
                <div></div>
                <button className="btn btn-primary" onClick={nextStep} disabled={!isStep1Valid}>Next <ChevronRight size={18} /></button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="step-panel animate-fade-in">
              <h2>2. Select Service</h2>
              {loading ? (
                <SkeletonLoader count={3} height="80px" />
              ) : (
                <div className="service-selection">
                  {services.map(s => (
                    <div 
                      key={s.name} 
                      className={`service-option ${formData.service === s.name ? 'selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, service: s.name }))}
                    >
                      <div>
                        <h4>{s.name}</h4>
                        <span style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>{s.duration}</span>
                      </div>
                      <div className="radio-circle"></div>
                    </div>
                  ))}
                </div>
              )}
              <div className="step-actions">
                <button className="btn btn-secondary" onClick={prevStep}><ChevronLeft size={18} /> Back</button>
                <button className="btn btn-primary" onClick={nextStep} disabled={!isStep2Valid}>Next <ChevronRight size={18} /></button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="step-panel animate-fade-in">
              <h2>3. Vehicle Information</h2>
              <div className="form-group">
                <label className="form-label">Vehicle Type *</label>
                <select className="form-select" name="vehicleType" value={formData.vehicleType} onChange={handleInputChange}>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="MUV">MUV</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Vehicle Make *</label>
                <input type="text" className="form-input" name="vehicleMake" value={formData.vehicleMake} onChange={handleInputChange} placeholder="e.g. Honda" />
              </div>
              <div className="form-group">
                <label className="form-label">Vehicle Model *</label>
                <input type="text" className="form-input" name="vehicleModel" value={formData.vehicleModel} onChange={handleInputChange} placeholder="e.g. City" />
              </div>
              <div className="form-group">
                <label className="form-label">Registration Number *</label>
                <input type="text" className="form-input" name="vehicleReg" value={formData.vehicleReg} onChange={handleInputChange} placeholder="e.g. KA-01-AB-1234" />
              </div>
              <div className="step-actions">
                <button className="btn btn-secondary" onClick={prevStep}><ChevronLeft size={18} /> Back</button>
                <button className="btn btn-primary" onClick={nextStep} disabled={!isStep3Valid}>Next <ChevronRight size={18} /></button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="step-panel animate-fade-in">
              <h2>4. Date & Time</h2>
              <div className="form-group">
                <label className="form-label">Select Date *</label>
                <input 
                  type="date" 
                  className="form-input" 
                  name="appointmentDate" 
                  value={formData.appointmentDate} 
                  onChange={handleInputChange}
                  min={today}
                  max={maxDateStr}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Select Time Slot *</label>
                <div className="timeslot-grid">
                  {timeSlots.map(slot => (
                    <button 
                      key={slot} 
                      className={`timeslot-btn ${formData.timeSlot === slot ? 'selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, timeSlot: slot }))}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <div className="step-actions">
                <button className="btn btn-secondary" onClick={prevStep}><ChevronLeft size={18} /> Back</button>
                <button className="btn btn-primary" onClick={nextStep} disabled={!isStep4Valid}>Next <ChevronRight size={18} /></button>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="step-panel animate-fade-in">
              <h2>5. Confirm Booking</h2>
              <div className="summary-box glass-panel">
                <div className="summary-row"><span>Name:</span> <strong>{formData.customerName}</strong></div>
                <div className="summary-row"><span>Phone:</span> <strong>{formData.phone}</strong></div>
                <div className="summary-row"><span>Service:</span> <strong>{formData.service}</strong></div>
                <div className="summary-row"><span>Vehicle:</span> <strong>{formData.vehicleMake} {formData.vehicleModel} ({formData.vehicleReg})</strong></div>
                <div className="summary-row"><span>Date:</span> <strong>{formData.appointmentDate}</strong></div>
                <div className="summary-row"><span>Time:</span> <strong>{formData.timeSlot}</strong></div>
                <div className="summary-total">
                  <span>Total Amount</span>
                  <span className="total-price">₹{calculatedAmount}</span>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '1.5rem' }}>
                <label className="form-label">Any Special Instructions?</label>
                <textarea className="form-textarea" rows="3" name="notes" value={formData.notes} onChange={handleInputChange} placeholder="E.g. Call before coming..."></textarea>
              </div>

              <div className="step-actions">
                <button className="btn btn-secondary" onClick={prevStep} disabled={isSubmitting}><ChevronLeft size={18} /> Back</button>
                <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Booking;
