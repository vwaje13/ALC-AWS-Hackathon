import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login'; 
import Homepage from './Homepage'; 
import ChildProfile from './childProfile';
import Dashboard from './Dashboard';
import LifeSkills from './LifeSkills';
import AcademicSkills from './AcademicSkills';
import SocialSkills from './SocialSkills';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/childProfile" element={<ChildProfile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/life" element={<LifeSkills />} />
      <Route path="/academic" element={<AcademicSkills />} />
      <Route path="/social" element={<SocialSkills />} />
    </Routes>
   </ BrowserRouter>
  );
}

export default App;