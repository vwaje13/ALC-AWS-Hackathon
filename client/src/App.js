import './styles/App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login'; 
import Homepage from './pages/Homepage'; 
import ChildProfile from './pages/childProfile';
import Dashboard from './pages/Dashboard';
import LifeSkills from './pages/LifeSkills';
import AcademicSkills from './pages/AcademicSkills';
import SocialSkills from './pages/SocialSkills';
import Companion from './pages/Companion'; 
import Story from './pages/Story';
import Quiz from './pages/Quiz';
import QuizCompletion from './pages/QuizCompletion';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/childProfile" element={<ChildProfile />} />
      <Route path="/life" element={<LifeSkills />} />
      <Route path="/academic" element={<AcademicSkills />} />
      <Route path="/social" element={<SocialSkills />} />
      <Route path="/:skill/companion" element={<Companion />} />
      <Route path = "/:skill/story" element={<Story />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/:skill/quiz" element={<Quiz />} />
      <Route path="/:skill/quiz/completion" element={<QuizCompletion />} />
      
    </Routes>
   </ BrowserRouter>
  );
}

export default App;