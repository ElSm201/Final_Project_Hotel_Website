import React, { useState } from 'react'
import { Modal, Box, TextField, Button, FormLabel, FormControl } from '@mui/material'
import {Navigate, Link } from 'react-router-dom'
import './Style/Room.css'
import { useForm } from 'react-hook-form';

export default function Rooms({setBookingSettings}) {
  const [open, setOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [redirect, setRedirect] = useState(false);

 

  const { register, handleSubmit } = useForm();

  const rooms = [
    {id: 1, name: 'Ocean View', img: '/images/room1.avif', description: 'Enjoy a beautiful view of the ocean from your room.', price: '$250/night'},
    {id: 2, name: 'Twin Double', img: '/images/room2.avif', description: 'A spacious room with two twin beds', price: '$200/night'}, //all room images from https://www.marriott.com/en-us/hotels/tpays-springhill-suites-clearwater-beach/overview/
    {id: 3, name: 'Smoking Allowed', img: '/images/room3.avif', description: 'A comfortable room where smoking is permitted.', price: '$180/night'},
    {id: 4, name: 'Standard Queen', img: '/images/room4.avif' , description: 'A cozy room with a queen-sized bed.', price: '$220/night'},
    {id: 5, name: 'Family Suite', img: '/images/room5.webp', description: 'A large suite perfect for families, with multiple beds and a living area.', price: '$350/night'},
  ];

    const onSubmit = (data) => {
      const today = new Date()
      const checkInDate = new Date(data.checkIn)
      const checkOutDate = new Date(data.checkOut)

      if(checkInDate < today || checkOutDate <= checkInDate){ //check that date is not in the past and check-out is after check-in
        alert('Please select valid check-in and check-out dates.')
        return
      }

      setBookingSettings({
        roomType: selectedRoom.name,
        roomPrice: selectedRoom.price,
        travelDates: { checkIn: data.checkIn, checkOut: data.checkOut },
     })

      setOpen(false)
      setRedirect(true) 
    }

    if(redirect){
    return <Navigate to="/booking" />//Navigate to booking page
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
          onSubmit={handleSubmit(onSubmit)}

          sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              flexDirection: 'column',
              gap: 2,
              bgcolor: 'white',
              border: '2px solid black',
              boxShadow: 24,
              p: 4,
          }}
        >
          <h2>{getSelectedName()}</h2>
          <h3>Choose Your Travel Dates</h3>
          <FormControl>
            <FormLabel>Check-In Date</FormLabel>
          <TextField type="date" {...register("checkIn", { required: true })} />
          </FormControl>
          <FormControl>
            <FormLabel>Check-Out Date</FormLabel>
          <TextField type="date" {...register("checkOut", { required: true })} />
          </FormControl>

          <Button type="submit" variant="contained">
            Continue Booking
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}