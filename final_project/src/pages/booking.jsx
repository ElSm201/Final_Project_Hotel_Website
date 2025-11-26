import React, {useState} from 'react'
import {Box,TextField,Button} from '@mui/material';
import {Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'

export default function Booking({bookingSettings}) {
 
  const { roomType, roomPrice, travelDates } = bookingSettings;
  const { checkIn, checkOut } = travelDates;
  const {register, handleSubmit} = useForm()
   

  const onSubmit = (e) => { //nothing is really gonna happen for now
    console.log(e)
    alert('Booking submitted!');
  };
//how to do math with dates in java script? https://medium.com/@selbekk/math-with-dates-in-javascript-2b0ddcee63f
const checkInDate = new Date(checkIn);
const checkOutDate = new Date(checkOut);
const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
//and then to convert to days and multiple by price

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