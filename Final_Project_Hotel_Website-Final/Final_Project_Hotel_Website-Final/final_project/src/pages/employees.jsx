import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Style/Reviews.css'

export default function Employees() {
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
      fetchReservations();
    }, []);

    const fetchReservations = async (name = '') => {
      const url = name 
        ? `http://localhost:3000/api/reservation/search?searchQuery=${name}`
        : 'http://localhost:3000/api/reservation';
      
      const res = await fetch(url);
      const data = await res.json();
      setReservations(data || []);
    };

  const cancelReservation = async (reservationNum) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) return;
    
      await fetch(`http://localhost:3000/api/reservation/${reservationNum}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'canceled' })
      });
      
      // Refresh the list
      fetchReservations(search);
  };

  return (
    <div>
      <ul className="navbar">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/rooms">Book a Room</Link></li>
        <li><Link to="/login">Employee Login</Link></li>
      </ul>
      
      <div style={{ padding: '20px' }}>
        <h1>Current Reservations</h1>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search by guest name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '250px' }}
          />
          <button
            onClick={() => fetchReservations(search)}
            style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
          > Search </button>
          {search && ( <button onClick={() => { setSearch(''); fetchReservations(); }}
              style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
            > Clear </button>
          )}
        </div>
        {reservations.length === 0 ? (
          <p>No reservations found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead style={{ backgroundColor: '#f5f5f5' }}>
              <tr>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Guest</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Room</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Status</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Check-in</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Check-out</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{res.name}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{res.room_id}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: res.status === 'confirmed' ? '#d4edda' : '#f8d7da',
                      color: res.status === 'confirmed' ? '#155724' : '#721c24',
                      fontWeight: 'bold'
                    }}>
                      {res.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    {new Date(res.check_in).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    {new Date(res.check_out).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    {res.status === 'confirmed' && (
                      <button 
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                        onClick={() => cancelReservation(res.reservation_num)}
                      >
                        Cancel
                      </button>
                    )}
                    {res.status === 'canceled' && <span style={{ color: '#666' }}>Canceled</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
