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
import Chatroom from './chatroom';

const App = () => {
  const [loggedin, setLoggedin] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
      }
      setIsLoading(false); 
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <Router>
        <Navbar loggedin={loggedin} setLoggedin={setLoggedin} isLoading={isLoading} />
        <div className="flex-grow">
          {isLoading ? (
            <Loading />
          ) : (
            <Routes>
              <Route path='/home' element={<Home loggedin={loggedin} setLoggedin={setLoggedin} create={false}/>} />
              <Route path='/' element={<Home loggedin={loggedin} setLoggedin={setLoggedin} />} />
              <Route path='/login' element={<Login loggedin={loggedin} setLoggedin={setLoggedin} />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/forgotpin' element={<Forgotpin />} />
              <Route path='/profilepage' element={<ProfilePage loggedin={loggedin} setLoggedin={setLoggedin} />} />
              <Route path='/createpost' element={<Home loggedin={loggedin} setLoggedin={setLoggedin} create={true}/>}></Route>
              <Route path='/chatroom' element={<Chatroom loggedin={loggedin} />} ></Route>
            </Routes>
          )}
        </div>
      </Router>
    </div>
  );
};

export default App;