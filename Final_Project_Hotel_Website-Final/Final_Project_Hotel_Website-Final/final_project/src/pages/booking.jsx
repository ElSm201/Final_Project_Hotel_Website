import React, {useState} from 'react'
import {Box,TextField,Button, FormControl, FormLabel} from '@mui/material';
import {Form, Link, useNavigate } from 'react-router-dom'
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
      <FormControl>
        <FormLabel>Customer Name</FormLabel>
      < TextField
        label="Customer Name"
        {...register('name', { required: true })}
      />
      </FormControl>
      <FormControl>
        <FormLabel>Customer Email</FormLabel>
      <TextField
        label="Customer Email"
        {...register('email', { required: true })}
      />
      </FormControl>
      <FormControl>
        <FormLabel>Customer Phone Number</FormLabel>
      <TextField
        label="Customer Phone Number"
        {...register('phone', { required: true })}
      />
      </FormControl>

        <Button type="submit" variant="contained">
          Submit Booking
        </Button>
      </Box>
    </div>
  );
}
