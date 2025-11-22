import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Box, TextField, Button, FormControl, FormLabel} from '@mui/material'

export default function Login() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [redirect, setRedirect] = useState(false)

  const handleSubmit = (e) => {

    // Rough verification logic will be better one database is built
    if(userName === 'admin' && password === '1234'){
      setRedirect(true); 
    }else{
      setError('Invalid username or password');
    }
  };

  // If the username and password is correct move to employee only page
  if(redirect){
    return <Navigate to="/employees" />;
  }

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
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column'}}
      >
        <FormControl>
          <FormLabel>User Name</FormLabel>
          <TextField
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required/>
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </div>
  );
}