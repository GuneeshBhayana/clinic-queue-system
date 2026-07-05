import React, { useState } from 'react';
import axios from 'axios';

const CustomerStatus = () => {
  const [input, setInput] = useState('');
  const [searchType, setSearchType] = useState('phone');
  const [statusData, setStatusData] = useState(null);

  const checkStatus = async () => {
    try {
      const { data } = await axios.get('http://https://clinic-queue-system-6xjj.onrender.com/api/queue');
      const queue = data.filter((q) => q.status === 'waiting');
      
      const index = queue.findIndex((q) => 
        searchType === 'phone' ? q.phone === input : q.tokenNumber === input
      );
      
      if (index !== -1) {
        setStatusData({
          token: queue[index].tokenNumber,
          position: index + 1,
          waitTime: index * 10
        });
      } else {
        alert(`No active reservation found for this ${searchType}`);
        setStatusData(null);
      }
    } catch (err) {
      alert('Error fetching status');
    }
  };

  return (
    <div>
      <h2>Check Your Wait Time</h2>
      
      <select onChange={(e) => setSearchType(e.target.value)} style={{ marginRight: '10px' }}>
        <option value="phone">Search by Phone</option>
        <option value="token">Search by Token</option>
      </select>
      
      <input 
        value={input}
        placeholder={`Enter ${searchType}`} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={checkStatus}>Check Status</button>
      
      {statusData && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <p>Token: {statusData.token}</p>
          <p>People ahead: {statusData.position - 1}</p>
          <p>Estimated Wait: {statusData.waitTime} minutes</p>
        </div>
      )}
    </div>
  );
};

export default CustomerStatus;