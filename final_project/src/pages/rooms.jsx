import React, { useState } from 'react'
import { Modal, Box, TextField, Button } from '@mui/material'
import { Navigate, Link } from 'react-router-dom'
import './Style/Room.css'

export default function Rooms({setBookingSettings}) {
  const [open, setOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
 

  const rooms = [
    {id: 1, name: 'Ocean View', img: '/images/room1.avif', description: 'Enjoy a beautiful view of the ocean from your room.', price: '$250/night'},
    {id: 2, name: 'Twin Double', img: '/images/room2.avif', description: 'A spacious room with two twin beds', price: '$200/night'}, //all room images from https://www.marriott.com/en-us/hotels/tpays-springhill-suites-clearwater-beach/overview/
    {id: 3, name: 'Smoking Allowed', img: '/images/room3.avif', description: 'A comfortable room where smoking is permitted.', price: '$180/night'},
    {id: 4, name: 'Standard Queen', img: '/images/room4.avif' , description: 'A cozy room with a queen-sized bed.', price: '$220/night'},
    {id: 5, name: 'Family Suite', img: '/images/room5.webp', description: 'A large suite perfect for families, with multiple beds and a living area.', price: '$350/night'},
  ];

  const [roomType, setRoomType] = useState('');
  const [roomPrice, setRoomPrice] = useState('');
  const [travelDates, setTravelDates] = useState({checkIn: '', checkOut: ''}); //RIP  I realized I didn't validate dates, so you can book in the past

  
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
   setRoomType(selectedRoom.name)
   setRoomPrice(selectedRoom.price)
   setTravelDates({checkIn: checkIn, checkOut: checkOut})
    //setRedirect(true)
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
              p: 4,
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
          <Link to="/booking"  onClick={() => setBookingSettings({
                  roomType: selectedRoom && selectedRoom.name,
                  roomPrice: selectedRoom && selectedRoom.price,
                  travelDates: { checkIn, checkOut }
            })}>  
          <Button type="submit" variant="contained">
            Continue Booking
          </Button>
          </Link>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}