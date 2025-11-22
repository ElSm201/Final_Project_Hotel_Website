import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Box, TextField, Button, FormControl, FormLabel,Modal} from '@mui/material';
import './style/Home.css';

export default function Home(){
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('');
  const [openModal, setOpenModal] = useState(false)
  const [modalEmail, setModalEmail] = useState('');

  const images = ['/images/beach1.jpg','/images/hotel_inside.jpg', '/images/hotel_outside.jpg','/images/inside_room.jpeg'];

 
  useEffect(() => {
    setOpenModal(true) // so the modal opens right when the page loads
  }, []);

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

  const handleSubmit = (e) => { //once database is set up maybe we can add it?
    console.log('Email:', email)
    console.log('Comment:', comment)
    alert('Thank you for your message!')
    setEmail('')
    setComment('')
  };

  const handleModalSubmit = (e) => {
    console.log('Modal Email:', modalEmail)
    alert(`Thanks for joining our email list, ${modalEmail}!`)
    setOpenModal(false)
    setModalEmail('')
  };

  return (
    <div>
      <ul className="navbar">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/rooms">Book a Room</Link></li>
        <li><Link to="/reviews">Restaurants Nearby</Link></li>
        <li><Link to="/login">Employee Login</Link></li>
      </ul>

      {/* Home images*/}
      <div className="home_img">
        <button onClick={prevImage} className="image-btn">‹</button>
        <img
          src={images[currentIndex]}
          alt={'Pictures of Hotel'}
          className="home_pictures"
        />
        <button onClick={nextImage} className="image-btn">›</button>
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

      {/* Centered Contact Form that may actually go somewhere eventually*/}
      <Box className="contact-form">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
        >
          <FormControl>
            <FormLabel>Email</FormLabel>
            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Comment</FormLabel>
            <TextField
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </FormControl>

          <Button type="submit" variant="contained"> Submit </Button>
        </Box>
      </Box>

      {/* Email List Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
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
          <h2>Join Our Email List</h2>
          <form onSubmit={handleModalSubmit}>
            <TextField
              type="email"
              label="Email Address"
              value={modalEmail}
              onChange={(e) => setModalEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
            >
              Join
            </Button>
          </form>
          <Button onClick={() => setOpenModal(false)}> Cancel</Button>
          </Box>
        </Modal>
      </div>
    );
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
