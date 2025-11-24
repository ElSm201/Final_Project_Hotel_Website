import React, {useState} from 'react'
import {Box,TextField,Button} from '@mui/material';
import {Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'

export default function Booking() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');


  const {register, handleSubmit} = useForm()
   

  const onSubmit = (e) => { //nothing is really gonna happen for now
    console.log('Name:', name);
    console.log('Email:', email);
    alert('Booking submitted!');
  };


  const customerName = register('Customer Name', { required: 'Customer Name is required' })
  const customerEmail = register('Customer Email', { required: 'Customer Email is required' })

  return (
    <div>
        <ul className="navbar">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/rooms">Book a Room</Link></li>
        <li><Link to="/reviews">Restaurants Nearby</Link></li>
        <li><Link to="/login">Employee Login</Link></li>
      </ul>
   
      <h2>Complete Your Booking!</h2>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label = "customerName"
          name = {customerName.name}
          onChange = {customerName.onChange}
          inputRef = {customerName.ref}
          required/>
        <TextField
          label = "custpmerEmail"
          name = {customerEmail.name}
          onChange = {customerEmail.onChange}
          inputRef = {customerEmail.ref}
          required />
        <Button type="submit" variant="contained">
          Submit Booking
        </Button>
      </Box>
    </div>
  );
}