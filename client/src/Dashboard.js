import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchQueue();
    const interval = setInterval(fetchQueue, 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
      setPassword('');
    }
  };

  const fetchQueue = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/queue');
      setQueue(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/queue/${id}`, { status });
      fetchQueue();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/queue/${id}`);
      fetchQueue();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const clearAll = async () => {
    if (window.confirm('Clear all entries?')) {
      try {
        await axios.delete('https://clinic-queue-system-6xjj.onrender.com/api/queue/clear/all');
        fetchQueue();
      } catch (err) {
        console.error('Clear error:', err);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ marginTop: '50px' }}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '8px', marginRight: '10px' }}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={clearAll} style={{ color: 'red', marginBottom: '20px' }}>
        Clear All
      </button>

      <table style={{ width: '90%', margin: '0 auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Token</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {queue.map((item, index) => (
            <tr key={item._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{index + 1}</td>
              <td>{item.tokenNumber}</td>
              <td>{item.customerName}</td>
              <td>{item.phone}</td>
              <td style={{ fontWeight: 'bold', color: item.status === 'completed' ? 'green' : 'orange' }}>
                {item.status.toUpperCase()}
              </td>
              <td>
                {item.status !== 'completed' && (
                  <button onClick={() => updateStatus(item._id, 'completed')}>Done</button>
                )}
                <button onClick={() => deleteEntry(item._id)} style={{ color: 'red' }}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;