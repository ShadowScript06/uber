# Uber Clone - MERN Stack

A fully functional Uber-like ride-hailing application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This project allows users to book rides in real-time while captains (drivers) can accept rides and update their status dynamically.  

**Live Demo:** [https://uber-frontend-alpha.vercel.app/](https://uber-frontend-alpha.vercel.app/)  

---

## Features

### User Features
- **User Authentication**: Signup & Signin functionality using JWT-based authentication.  
- **Ride Booking**: Users can request rides with **dynamic fare calculation** based on real distance between pickup and drop-off locations.  
- **Real-time Updates**: Live updates on ride status (ride accepted, in progress, completed).  
- **Ride Matching**: Automatically matches riders with available captains nearby.  
- **Place Suggestions**: Integration with APIs (like Google Places) for real locations, autocomplete suggestions for pickup and drop-off.  

### Captain (Driver) Features
- **Captain Authentication**: Signup & Signin functionality using JWT.  
- **Ride Management**: Accept or reject ride requests.  
- **Real-time Status Updates**: Update ride status to keep users informed.  
- **Ride History**: View past rides and earnings.  

### Backend Features
- **JWT Authentication** for secure communication.  
- **Dynamic Fare Calculation** using actual distance (Haversine formula or Maps API).  
- **Complex Backend Calls** for ride matching, booking, and updates.  
- **Real-time Ride Booking Updates** using APIs (can be extended with WebSockets for live tracking).  

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS (or your styling library)  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (with Mongoose)  
- **Authentication**: JWT (JSON Web Tokens)  
- **APIs**: Google Places / Map APIs for real-world location suggestions  
- **Deployment**: Vercel (Frontend), [Backend deployed separately if applicable]  

---

## Installation

Clone the repository:

git clone <your-repo-link>
cd uber-clone

cd backend
npm install
npm run dev


cd frontend
npm install
npm start


MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT Secret>
GOOGLE_MAPS_API_KEY=<Your Google Maps / Places API key>
PORT=5000


REACT_APP_BASE_URL=<Your backend API URL>
REACT_APP_GOOGLE_MAPS_API_KEY=<Your Google Maps / Places API key>




---

If you want, I can **also draft a “visual roadmap” section** showing future features as a table with potential timeline and tech stack, which makes your project look very professional for GitHub or portfolio.  

Do you want me to do that?



git clone <your-repo-link>
cd uber-clone
