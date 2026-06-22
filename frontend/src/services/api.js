const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const fetchServices = async () => {
  const res = await fetch(`${BASE_URL}/services`);
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
};

export const fetchPlans = async () => {
  const res = await fetch(`${BASE_URL}/plans`);
  if (!res.ok) throw new Error('Failed to fetch plans');
  return res.json();
};

export const createBooking = async (bookingData) => {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create booking');
  }
  return res.json();
};

// Admin Endpoints
export const fetchBookings = async () => {
  const res = await fetch(`${BASE_URL}/bookings`);
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
};

export const updateBookingStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update booking status');
  return res.json();
};

export const deleteBooking = async (id) => {
  const res = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete booking');
  return res.json();
};
