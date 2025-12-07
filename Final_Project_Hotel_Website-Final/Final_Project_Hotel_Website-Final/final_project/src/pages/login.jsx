import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Box, TextField, Button, FormControl, FormLabel} from '@mui/material'
import {useForm} from 'react-hook-form'

export default function Login() {
  //const [userName, setUserName] = useState('')
  //const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [redirect, setRedirect] = useState(false);
  const {register, handleSubmit} = useForm()

 const onSubmit = async (data) => {
    setError('')

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: data.username,
          password: data.password
        })
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
        alert('Please check your username and password and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
      alert('Login failed. Please try again.');
    }
  }

  if (redirect) {
    return <Navigate to="/employees" />
  }

  return(
    <div>
        <div>
          <ul className="navbar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/rooms">Book a Room</Link></li>
            <li><Link to="/login">Employee Login</Link></li>
          </ul>
        </div>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column'}}
      >
        <FormControl>
          <FormLabel>User Name</FormLabel>
          <TextField
            label = "userName"
            {...register('username',{required:true})}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <TextField
            label = "password"
            type="password"
            {...register('password',{required:true})}
          />
        </FormControl>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </div>
  );
}
