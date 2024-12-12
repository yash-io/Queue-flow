import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../auth/login';
import Home from './Home';
import Signup from '../auth/signup';
import Forgotpin from '../auth/forgotpin';
import ProfilePage from '../auth/profile_page';
import { auth } from '../auth/firebase';
import Loading from './loading';
import Navbar from './Navbar';

const App = () => {
  const [loggedin, setLoggedin] = useState(null);
  const [isLoading, setIsLoading] = useState(false); //used for loading screen

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedin(true);
        setIsLoading(false);
      } else {
        setLoggedin(false);
      }
       // Authentication state has been determined
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);
  

  return (
    <div>
      <Router>
        <Navbar loggedin={loggedin} setLoggedin={setLoggedin} isLoading={isLoading} />
        
        {isLoading ? (
          
          <Loading />
        ) : (
          
          <Routes>
            <Route path='/home' element={<Home loggedin={loggedin} setLoggedin={setLoggedin} />} />
            <Route path='/' element={<Home loggedin={loggedin} setLoggedin={setLoggedin} />} />
            <Route path='/login' element={<Login loggedin={loggedin} setLoggedin={setLoggedin} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/forgotpin' element={<Forgotpin />} />
            <Route path='/profilepage' element={<ProfilePage loggedin={loggedin} setLoggedin={setLoggedin} />} />
          </Routes>
        )}
      </Router>
    </div>
  );
};

export default App;