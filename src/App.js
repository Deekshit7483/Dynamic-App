import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Page from './pages/Page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/page/:pageId" element={<Page />} />
      </Routes>
    </Router>
  );
}

export default App;
