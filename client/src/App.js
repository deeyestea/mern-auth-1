import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LoginComponent from './components/loginComponent';
import RegisterComponent from './components/registerComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={<LoginComponent />} />
        <Route path='/register' Component={<RegisterComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
