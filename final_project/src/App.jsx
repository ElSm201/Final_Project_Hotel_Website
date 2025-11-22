import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './pages/home';
import Reviews from './pages/reviews'
import Rooms from './pages/rooms'
import Login from './pages/login'
import Employees from './pages/employees';
import Booking from './pages/booking'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms/>} /> 
        <Route path="/reviews" element={<Reviews />} /> 
        <Route path="/login" element={<Login/>} />
        <Route path="/employees" element={<Employees/>} />
        <Route path="/booking" element={<Booking/>} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;