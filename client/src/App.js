import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login'; 
import Homepage from './Homepage'; 
import ChildProfile from './childProfile';
import Dashboard from './Dashboard';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/childProfile" element={<ChildProfile />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
   </ BrowserRouter>
  );
}

export default App;