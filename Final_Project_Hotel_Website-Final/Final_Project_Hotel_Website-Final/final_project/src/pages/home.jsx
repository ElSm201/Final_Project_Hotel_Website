import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Box, TextField, Button, FormControl, FormLabel,Modal} from '@mui/material';
import './style/Home.css';
import { useForm } from 'react-hook-form';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'//need to add install to the readme
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos' // https://mui.com/material-ui/material-icons/?query=arrow
import Weather from '../components/Weather';

export default function Home(){
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false)
  //const [modalEmail, setModalEmail] = useState('');

  const images = ['/images/beach1.jpg','/images/hotel_inside.jpg', '/images/hotel_outside.jpg','/images/inside_room.jpeg'];



  const nextImage = () => { //maybe I can change this later for pic to cycle automatically
    let newIndex = currentIndex + 1
    if(newIndex >= images.length){ //restart once it cycles through images
      newIndex = 0
    }
    setCurrentIndex(newIndex)
  }

  const prevImage = () => {
    let newIndex = currentIndex - 1
    if(newIndex < 0){
      newIndex = images.length - 1
    }
    setCurrentIndex(newIndex)
  };

  const {register, handleSubmit, reset} = useForm();

  const onSubmit = (data) => {
    alert(`Thank you for your message, ${data.email}`)
    reset()
  }





  return (
    <div>
      <ul className="navbar">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/rooms">Book a Room</Link></li>
        <li><Link to="/login">Employee Login</Link></li>
      </ul>

      {/* Home images*/}
      <div className="home_img">
      <Button
          startIcon={<ArrowBackIosNewIcon />}
          onClick={prevImage}
          aria-label="previous"
        >
        </Button>

      {/**Button set up from https://stackoverflow.com/questions/61456299/react-using-arrows-in-a-button */}
        <img
          src={images[currentIndex]}
          alt={'Pictures of Hotel'}
          className="home_pictures"
        />
        
        <Button
          endIcon={<ArrowForwardIosIcon />}
          onClick={nextImage}
          aria-label="next"
        >
        </Button>


      </div>

      {/* Hotel description */}
      <div>
        <h1>Book your next trip to Paradise</h1>
        <h3>Hotel Paradise</h3>
        <p>Enjoy luxury rooms, breathtaking views, and world-class service. From lounging at the pool to enjoying our world class 
          there's something for everyone!
        </p>
        <h3>More about location</h3>
        <p>Located near the beach with easy access to restaurants and attractions including an aquarium.</p>
      </div>

 {/*Contact Form that may actually go somewhere eventually*/}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl>
          <FormLabel>Email</FormLabel>
        <TextField label="Email" 
        {...register('email', { required: true })}
         />
        </FormControl>
        <FormControl>
          <FormLabel>Comments</FormLabel>
        <TextField label="Comment"
        {...register('comment', { required: true })}
        multiline rows={4} 
        />
        </FormControl>
        <Button type="submit" variant = "contained">Submit</Button>
      </Box>


      <Weather />
      
      
    </div>


    )
  }
/**
 * Add images to home page 
 * short description of the hotel and locaton 
 * contact form at the bottom?
 * Modal to prompt email list?
 * 
 * Login page 
 * Create a form for employees to login 
 * 
 * Reviews 
 * Description of area 
 * Text for where api results will go
 * 
 * Rooms 
 * Give a basic grid structure 
 * Click on image and create a modal to send info to database
 * 
 */
