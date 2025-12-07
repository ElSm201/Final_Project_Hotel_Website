# Final_Project_Hotel_Website


Project Name: Hotel Application 

# Overview
Our Hotel Application is a full-stack hotel booking web application designed to simulate a real hotel reservation system. Customers can browse rooms, select travel dates, and complete bookings. Employees can log in to manage reservations, search guests, and cancel bookings.

# Team Members & Their Roles
* Ella Smith - Frontend Development
* Monica Fornaszewski- Frontend/ Integration
* R’Reeyah Marby-Francis - Backend Development

# User Accounts & Roles: 
By having customers and employees use the website, we can have different roles, allowing different actions for reservations. 

# Database: 
* PostgreSQL database hosted on Supabase
* Stores data for guests, employees, rooms, and reservations.
* Tables include: guest_info, payment_info, reservation, rooms, staff

# Interactive UI:
* Clickable room cards open a pop-up form for selecting dates
* Availability is checked dynamically
* Second step of form collects guest info
* Employee dashboard dynamically updates after cancellations

# New Library or Framework: 
React Hook Form

# Internal REST API:
The internal APIs handle:
* Reservation creation
* Availability checks
* Guest auto-creation
* Employee login
* Employee dashboard population
* Searching by guest name
* Canceling reservations

# External REST API: 
* Uses the Open Weather API to show a 5-day forecast on the home page.


# User Story / Use Case: 
### Customer: 
The customer will be greeted with a welcome page displaying a brief overview of the hotel.
The customer will be able to navigate to select a room and date 
If interested, the customer will be able to book a room.
Once booked, the customer will be added to the database(Returning customers that are already in the database will not be added again).
### Employee: 
The employee will log in from a link on the homepage 
They will be able to see all reservations and search by customer name.
Additionally, they will have the ability to cancel reservations

# Technical Design:
Frontend: 
* React (Vite), CSS

Backend:
* Node.js + Express.js

Database:
* Supabase PostgreSQL



# Installation & Set up Instructions

### Install Dependencies
* npm install react-router-dom @mui/material @mui/icons-material react-hook-form bcryptjs 
* npm install cors

### Create a .env File
* Add the database URL to the .env file
* DATABASE_URL = postgresql://postgres.ocsqwetnslwpknbnbtoo:[password]@aws-1-us-east-1.pooler.supabase.com:5432/postgres

### Run
In one terminal, cd to final_project, then run the command npm run dev. In a second terminal, cd to final_project and run the command node app.js to start the server.

# API Keys & Database Setup
Supabase automatically provides:

* PostgreSQL connection URL
* Host, port, user, password
* SQL editor for creating tables 
* Manual table creation

# images source
rooms - [https://www.marriott.com/en-us/hotels/tpays-springhill-suites-clearwater-beach/overview/]
home page - [https://www.peakpx.com/en/hd-wallpaper-desktop-euzxf], [https://www.agoda.com/holiday-inn-sarasota-lido-beach-at-the-beach/hotel/sarasota-fl-us.html?ds=InUEYK0q5iX6DMuG], [https://reserving.com/hotels/america/united-states/florida/sarasota/sarasota/lido-beach-resort], [https://www.opalcollection.com/zota/stay/]




