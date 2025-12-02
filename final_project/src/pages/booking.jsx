import React, {useState} from 'react'
import {Box,TextField,Button} from '@mui/material';
import {Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { createReservation } from '../api/reservationApi';

export default function Booking({bookingSettings}) {
 
  const { roomType, roomPrice, travelDates, roomId } = bookingSettings;
  const { checkIn, checkOut } = travelDates;
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate();
   

  const onSubmit = async (formData) => {
    try {
      const reservationPayload = {
        name: formData.name,        
        email: formData.email,       
        type: roomType,             
        check_in: checkIn,          
        check_out: checkOut,   
        phone: formData.phone,
        room_id: roomId,
        total_price: totalPrice,
        status: 'confirmed',     
      };

      await createReservation(reservationPayload);
      alert('Booking confirmed!');
      navigate('/');
      
    } catch (error) {
      alert(error.message || 'Booking failed. Please try again.');
    }
  };
//how to do math with dates in java script? https://medium.com/@selbekk/math-with-dates-in-javascript-2b0ddcee63f
const checkInDate = new Date(checkIn)
const checkOutDate = new Date(checkOut)
const timeDifference = checkOutDate.getTime() - checkInDate.getTime()
//and then to convert to days from miliseconds https://gist.github.com/flangofas/714f401b63a1c3d84aaa
const daysDifference = timeDifference / (1000 * 60 * 60 * 24)
//get the price by removing the dollar sign and /night from roomPrice https://www.w3schools.com/jsref/jsref_replace.asp
const pricePerNight = parseInt(roomPrice.replace('$','').replace('/night','')) //use replace to get rid of dollar sign and /night
const totalPrice = pricePerNight * daysDifference

  const customerName = register('Customer Name', { required: 'Customer Name is required' })
  const customerEmail = register('Customer Email', { required: 'Customer Email is required' })
  const customerPhone = register('Customer Email', { required: 'Customer Phone Number is required' })

  return (
    <div>
        <ul className="navbar">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/rooms">Book a Room</Link></li>
        <li><Link to="/reviews">Restaurants Nearby</Link></li>
        <li><Link to="/login">Employee Login</Link></li>
      </ul>
   
      <h2>Complete Your Booking!</h2>
      <h3>Room Type: {roomType}</h3>
      <h3>Room Price: {roomPrice}</h3>
      <h3>Travel Dates: {checkIn} to {checkOut}</h3>
      <h3>Total Price: ${totalPrice}</h3>
  
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label = "Customer Name"
          name = {customerName.name}
          onChange = {customerName.onChange}
          inputRef = {customerName.ref}
          required/>
        <TextField
          label = "Customer Email"
          name = {customerEmail.name}
          onChange = {customerEmail.onChange}
          inputRef = {customerEmail.ref}
          required />
          <TextField
          label = "Customer Phone Number"
          name = {customerPhone.name}
          onChange = {customerPhone.onChange}
          inputRef = {customerPhone.ref}
          required />
        <Button type="submit" variant="contained">
          Submit Booking
        </Button>
      </Box>
    </div>
  );
}