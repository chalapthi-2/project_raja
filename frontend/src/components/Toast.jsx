import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)';
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      background: bgColor,
      color: '#fff',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      animation: 'fadeIn 0.3s ease'
    }}>
      {type === 'success' ? <CheckCircle size={24} /> : <XCircle size={24} />}
      <span style={{ fontWeight: 500 }}>{message}</span>
      <button 
        onClick={onClose} 
        style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', marginLeft: '1rem' }}
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default Toast;
