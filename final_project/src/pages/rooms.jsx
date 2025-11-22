import React, { useState } from 'react'
import { Modal, Box, TextField, Button } from '@mui/material'
import { Navigate, Link } from 'react-router-dom'
import './Style/Room.css'

export default function Rooms() {
  const [open, setOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [redirect, setRedirect] = useState(false)

  const rooms = [
    {id: 1, name: 'Ocean View', img: '/images/room1.avif'},
    {id: 2, name: 'Twin Double', img: '/images/room2.avif'}, //all room images from https://www.marriott.com/en-us/hotels/tpays-springhill-suites-clearwater-beach/overview/
    {id: 3, name: 'Smoking Allowed', img: '/images/room3.avif' },
    {id: 3, name: 'Standard Queen', img: '/images/room4.avif' },
    {id: 4, name: 'Family Suite', img: '/images/room5.webp' },
  ];

  if(redirect){
    return <Navigate to="/booking" />;
  }
  const handleOpen = (room) => {
    setSelectedRoom(room)
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
    setSelectedRoom(null)
    setCheckIn('')
    setCheckOut('')
  };

  const handleSubmit = (e) => {
    // Save info so Booking page can read it
    localStorage.setItem('room', getSelectedName())
    localStorage.setItem('checkIn', checkIn)
    localStorage.setItem('checkOut', checkOut)

    setRedirect(true) // trigger redirect to employee only page
  }

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
        <li><Link to="/reviews">Restaurants Nearby</Link></li>
        <li><Link to="/login">Employee Login</Link></li>
      </ul>
      <h1>Available Rooms</h1>
      <div className="rooms-grid">
        {rooms.map((room) => (
          <div key={room.id} className="room-card" onClick={() => handleOpen(room)}>
            <img src={room.img} alt={room.name} />
            <h3>{room.name}</h3>
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
            bgcolor: 'white',
            p: 4,
            width: 400,
            flexDirection: 'column',
            gap: 2
          }}
        >
          <h2>{getSelectedName()}</h2>

          <TextField
            type="date"
            label="Check-in Date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required/>

          <TextField
            type="date"
            label="Check-out Date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required/>
          <Button type="submit" variant="contained">
            Continue Booking
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}