import React from 'react';
import './App.css';
import Loginpage from './Components/Loginpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Routes/Homepage';


function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path='/' element={<Loginpage />} />
          <Route path='/home' element={<Homepage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
