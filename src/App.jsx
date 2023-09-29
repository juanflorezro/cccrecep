import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './home/protectedRoutes/ProtectedRoutes'
import Login from './login/Login'
import Home from './home/Home'
import HomeRoutes from './home/HomeRoutes'
import About from './home/About'
import AOS from 'aos'
import 'aos/dist/aos.css'
export default function App() {
  return (
    <BrowserRouter>
        
        <Routes>
          
          <Route path="/about" element={<About />} />
          
          <Route path="/login" element={<Login />} />
          
        </Routes>
        <HomeRoutes/>
    </BrowserRouter>
  );
}
