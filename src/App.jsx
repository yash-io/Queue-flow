import { useState,useEffect } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './auth/login'
import Home from './Home';
import Signup from './auth/signup';
const App = ()=> {
 const [loggedin, setLoggedin] = useState(false);

 useEffect(() => {
  const loggedInState = localStorage.getItem('loggedin') === 'true';
  setLoggedin(loggedInState);
}, [App,setLoggedin]);

 
  return (
    <div>
       <Router>
        <Routes>
          <Route path='/home'element={<Home loggedin={loggedin} setLoggedin={setLoggedin} />}/>
          <Route path="/" element={<Home loggedin={loggedin} setLoggedin={setLoggedin} />} />
          <Route path="/login" element={<Login loggedin={loggedin} setLoggedin={setLoggedin} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile'  />
        </Routes>
       </Router>
    </div>
  );

}

export default App
