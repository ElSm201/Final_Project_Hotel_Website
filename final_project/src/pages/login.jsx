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

 const onSubmit = (data) => {
    setError('')

    if (data.userName === 'admin' && data.password === '1234') {
      setRedirect(true) //use Navigate here, but we don't always 
      //want to navigate, only on successful login rather than using Link
    }else{
    alert('Please check your username and password and try again.')
    setError('Invalid username or password')
    }
  }

  if (redirect) {
    return <Navigate to="/employees" /> //use Navigate here, but we don't always 
      //want to navigate, only on successful login rather than using Link
  }

  const userName = register('userName', { required: 'User Name is required' })
  const password = register('password', { required: 'Password is required' })

  return(
    <div>
        <div>
          <ul className="navbar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/rooms">Book a Room</Link></li>
            <li><Link to="/reviews">Restaurants Nearby</Link></li>
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
            name = {userName.name}
            onChange = {userName.onChange}
            inputRef = {userName.ref}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <TextField
            label = "password"
            name = {password.name}
            onChange = {password.onChange}
            inputRef = {password.ref}
          />
        </FormControl>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </div>
  );
}