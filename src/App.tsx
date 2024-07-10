import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from './pages/StartPage';
import MainPage from './pages/MainPage';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="main" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;