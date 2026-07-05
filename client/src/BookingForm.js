import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^\d{10}$/;
    if (!name.trim()) return alert('Name is required');
    if (!phoneRegex.test(phone)) return alert('Phone must be 10 digits');

    try {
      const { data } = await axios.post('http://https://clinic-queue-system-6xjj.onrender.com/api/queue/join', { 
        customerName: name, 
        phone 
      });
      alert(`Token Generated: ${data.tokenNumber}`);
    } catch (err) {
      const message = err.response?.data?.error || 'Connection error';
      alert(`Error: ${message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        placeholder="Name" 
        value={name}
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        placeholder="Phone" 
        value={phone}
        onChange={(e) => setPhone(e.target.value)} 
        required 
      />
      <button type="submit">Get Token</button>
    </form>
  );
};

export default BookingForm;