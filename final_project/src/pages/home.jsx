import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

export default function Home(){
    
    return(
        <div>
            <div className = "nav">
                <ul>
                    <Link to="/home">Home</Link>
                    <Link to="/rooms">Book a Room</Link>
                    <Link to="/reviews">Resturants nearby</Link>
                    <Link to="/login">Employee Login</Link>
                </ul>
            </div>
            <style jsx>{

            }</style>
        </div>
    )
}