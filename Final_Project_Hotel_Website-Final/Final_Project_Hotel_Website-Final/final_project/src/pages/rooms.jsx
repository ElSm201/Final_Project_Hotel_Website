import React, { useState } from 'react'
import { Modal, Box, TextField, Button, FormControl, FormLabel } from '@mui/material'
import { Form, Link, useNavigate} from 'react-router-dom'
import './Style/Room.css'
import { checkAvailability } from '../api/reservationApi';

export default function Rooms({setBookingSettings}) {
  const [open, setOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const rooms = [
    {id: 1, name: 'Ocean View', img: '/images/room1.avif', description: 'Enjoy a beautiful view of the ocean from your room.', price: '$250/night'},
    {id: 2, name: 'Twin Double', img: '/images/room2.avif', description: 'A spacious room with two twin beds', price: '$200/night'}, //all room images from https://www.marriott.com/en-us/hotels/tpays-springhill-suites-clearwater-beach/overview/
    {id: 3, name: 'Smoking Allowed', img: '/images/room3.avif', description: 'A comfortable room where smoking is permitted.', price: '$180/night'},
    {id: 4, name: 'Standard Queen', img: '/images/room4.avif' , description: 'A cozy room with a queen-sized bed.', price: '$220/night'},
    {id: 5, name: 'Family Suite', img: '/images/room5.webp', description: 'A large suite perfect for families, with multiple beds and a living area.', price: '$350/night'},
  ];

  



  const handleOpen = (room) => {
    setSelectedRoom(room)
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
    setSelectedRoom(null)
    setCheckIn('')
    setCheckOut('')
    setLoading(false)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic date validation
    const today = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    if (checkInDate < today) {
      alert('Check-in date cannot be in the past.');
      return;
    }
    
    if (checkOutDate <= checkInDate) {
      alert('Check-out date must be after check-in date.');
      return;
    }

    setLoading(true);

    try {
      // Check availability with the API
      const availability = await checkAvailability({
        roomType: selectedRoom.name,
        checkIn: checkIn,
        checkOut: checkOut
      });

      if (availability.available) {
        // Room is available - save booking settings and navigate to booking page
        setBookingSettings({
          roomType: selectedRoom.name,
          roomPrice: selectedRoom.price,
          travelDates: { checkIn, checkOut },
          roomId: selectedRoom.id
        });
        handleClose(); 
        navigate('/booking'); // Navigate to booking page
      } else {
        alert('Sorry, this room is not available for the selected dates. Please choose different dates or another room.');
      }
    } catch (error) {
      console.error('Availability check failed:', error);
      alert('Error checking availability. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSelectedName = () => {
  if(selectedRoom){
    return selectedRoom.name
    }
      return "error"
  }

  return (
    <div className="rooms-page">
      <ul className="navbar">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/rooms">Book a Room</Link></li>
        <li><Link to="/login">Employee Login</Link></li>
      </ul>
      <h1>Available Rooms</h1>
      <div className="rooms-grid">
        {rooms.map((room) => (
          <div key={room.id} className="room-card" onClick={() => handleOpen(room)}>
            <img src={room.img} alt={room.name} />
            <h3>{room.name}</h3>
            <h4>{room.price}</h4>
            <p>{room.description}</p>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'white',
              border: '2px solid black',
              boxShadow: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              p: 4,
          }}
        >
          <h2>{getSelectedName()}</h2>

          <FormControl>
            <FormLabel>Check-In Date</FormLabel>
          <TextField
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
            disabled={loading}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Check-Out Date</FormLabel>
          <TextField
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
            disabled={loading}
            />
            </FormControl>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
          >
            {loading ? 'Checking Availability...' : 'Continue Booking'}
          </Button>
          
          <Button 
            onClick={handleClose} 
            disabled={loading}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
