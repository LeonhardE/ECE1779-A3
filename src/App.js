import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Component/HomePage';
import Profile from './Component/Profile'
import Create from './Component/Create'
import Manage from './Component/Manage'
import Trend from './Component/Trend'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<Create />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/trend" element={<Trend />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
