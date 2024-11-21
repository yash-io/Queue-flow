import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './login'
import Home from './Home';
function App() {
 const [loggedin, setLoggedin] = useState(false);
  return (
    <div>
       <Router>
        <Routes>
          <Route path="/" element={<Home loggedin={loggedin} setLoggedin={setLoggedin} />} />
          <Route path="/login" element={<Login loggedin={loggedin} setLoggedin={setLoggedin} />} />
        </Routes>
       </Router>
    </div>
  );

}

export default App
