import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/login';
import Home from './Home';
import Signup from './auth/signup';

function App() {
 const [loggedin, setLoggedin] = useState(false);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home loggedin={loggedin}  setLoggedin={setLoggedin}/>} />
          <Route path="/login" element={<Login loggedin={loggedin} setLoggedin={setLoggedin} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;