import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookingForm from './BookingForm';
import Dashboard from './Dashboard';
import CustomerStatus from './CustomerStatus';

const App = () => {
  return (
    <Router>
      <div className="app-container" style={{ textAlign: 'center', marginTop: '50px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Book Appointment</Link>
          <Link to="/status" style={{ marginRight: '15px' }}>Check Status</Link>
          <Link to="/admin">Admin Dashboard</Link>
        </nav>
        
        <hr style={{ margin: '20px' }} />

        <Routes>
          <Route path="/" element={
            <main>
              <h1>Clinic Queue System</h1>
              <BookingForm />
            </main>
          } />
          <Route path="/status" element={<CustomerStatus />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;