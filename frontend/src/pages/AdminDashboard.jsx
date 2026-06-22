import { useState, useEffect } from 'react';
import { fetchBookings, updateBookingStatus, deleteBooking } from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader';
import { Search, Filter, Trash2, Calendar, DollarSign, Clock, CheckCircle } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = ({ showToast }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const loadBookings = async () => {
    try {
      const data = await fetchBookings();
      setBookings(data);
    } catch (err) {
      showToast('Error loading bookings', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateBookingStatus(id, newStatus);
      showToast('Status updated');
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
    } catch (err) {
      showToast('Error updating status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBooking(id);
        showToast('Booking deleted');
        setBookings(prev => prev.filter(b => b._id !== id));
      } catch (err) {
        showToast('Error deleting booking', 'error');
      }
    }
  };

  // KPIs calculation
  const today = new Date().toISOString().split('T')[0];
  const todaysBookings = bookings.filter(b => new Date(b.appointmentDate).toISOString().split('T')[0] === today);
  const upcomingBookings = bookings.filter(b => new Date(b.appointmentDate).toISOString().split('T')[0] > today && !['Completed', 'Cancelled'].includes(b.status));
  const completedBookings = bookings.filter(b => b.status === 'Completed');

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => {
    const matchSearch = b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        b.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        b.phone.includes(searchTerm);
    const matchStatus = statusFilter === 'All' ? true : b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusClass = (status) => {
    return `status-${status.toLowerCase().replace(' ', '')}`;
  };

  return (
    <div className="admin-page container" style={{ padding: '3rem 1.5rem' }}>
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage all customer bookings and track performance.</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card glass-panel">
          <div className="kpi-icon"><Calendar size={24} /></div>
          <div>
            <h3>Total Bookings</h3>
            <span className="kpi-value">{bookings.length}</span>
          </div>
        </div>
        <div className="kpi-card glass-panel">
          <div className="kpi-icon"><Clock size={24} /></div>
          <div>
            <h3>Today's Bookings</h3>
            <span className="kpi-value">{todaysBookings.length}</span>
          </div>
        </div>
        <div className="kpi-card glass-panel">
          <div className="kpi-icon"><DollarSign size={24} /></div>
          <div>
            <h3>Upcoming</h3>
            <span className="kpi-value">{upcomingBookings.length}</span>
          </div>
        </div>
        <div className="kpi-card glass-panel">
          <div className="kpi-icon"><CheckCircle size={24} /></div>
          <div>
            <h3>Completed</h3>
            <span className="kpi-value">{completedBookings.length}</span>
          </div>
        </div>
      </div>

      <div className="admin-table-container glass-panel">
        <div className="table-controls">
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by ID, Name or Phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="filter-dropdown">
            <Filter size={20} className="filter-icon" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {loading ? (
          <SkeletonLoader count={5} height="60px" />
        ) : (
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Service</th>
                  <th>Vehicle</th>
                  <th>Date & Time</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '2rem' }}>No bookings found</td>
                  </tr>
                ) : (
                  filteredBookings.map(b => (
                    <tr key={b._id}>
                      <td className="font-mono text-xs">{b.bookingId}</td>
                      <td style={{ fontWeight: 500 }}>{b.customerName}</td>
                      <td>{b.phone}</td>
                      <td>{b.service}</td>
                      <td>{b.vehicleMake} {b.vehicleModel} <br/><span style={{fontSize:'0.8rem', color:'var(--text-secondary)'}}>{b.vehicleReg}</span></td>
                      <td>{new Date(b.appointmentDate).toLocaleDateString()} <br/><span style={{fontSize:'0.8rem', color:'var(--text-secondary)'}}>{b.timeSlot}</span></td>
                      <td style={{ fontWeight: 600, color: 'var(--accent-color)' }}>₹{b.amount}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(b.status)}`}>{b.status}</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <select 
                            className="status-select" 
                            value={b.status} 
                            onChange={(e) => handleStatusUpdate(b._id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirm</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Complete</option>
                            <option value="Cancelled">Cancel</option>
                          </select>
                          <button className="btn-icon delete" onClick={() => handleDelete(b._id)} title="Delete Booking">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
