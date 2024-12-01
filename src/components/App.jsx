import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../auth/login';
import Home from './Home';
import Signup from '../auth/signup';
import Forgotpin from '../auth/forgotpin';
import ProfilePage from '../auth/profile_page';
import Loading from './loading';
import { auth } from '../auth/firebase';

const App = () => {
  const [loggedin, setLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Set up the listener for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
      }
      setIsLoading(false); // Authentication state has been determined
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    // Render a loading indicator while checking auth status
    return <Loading loggedin={loggedin} />;
  }
  return (
    <div>
       <Router>
        <Routes>
          <Route path='/home'element={<Home loggedin={loggedin} setLoggedin={setLoggedin} />}/>
          <Route path="/" element={<Home loggedin={loggedin} setLoggedin={setLoggedin} />} />
          <Route path="/login" element={<Login loggedin={loggedin} setLoggedin={setLoggedin} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgotpin' element={<Forgotpin/>}  />
          <Route path='/profilepage' element={<ProfilePage loggedin={loggedin} setLoggedin={setLoggedin} />} />
        </Routes>
       </Router>
    </div>
  );

}

export default App
