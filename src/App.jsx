import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './home/protectedRoutes/ProtectedRoutes'
import Login from './login/Login'
import Home from './home/Home'
import HomeRoutes from './home/HomeRoutes'
import About from './home/About'

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route element={<ProtectedRoutes canActive ={true} />}>
            <Route path="/about" element={<About />} />
          </Route>
          <Route path="/login" element={<Login />} />
          
        </Routes>
        <HomeRoutes/>
      </div>
    </Router>
  );
}
