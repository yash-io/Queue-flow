import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Navbar from '../Navbar';

const Login = ({ setLoggedin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
   await signInWithEmailAndPassword(auth, email, password);
      setLoggedin(true);
      localStorage.setItem('loggedin', 'true'); // Save login state to local storage
      navigate('/home');
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  const rememberMe = () => {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('loggedin', 'true');
  }

  return (
    <div>
      <Navbar loggedin={false} />
      <div className="flex justify-center items-center max-w-full bg-black min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <form onSubmit={handleLogin} className="p-8 m-10 border-2 rounded-md w-full xs:max-w-sm bg-gray-300">
          <h2 className="text-3xl font-medium mb-6 text-center">Login</h2>
          <label htmlFor="username" className='block mb-2 font-medium text-gray-700'>
            Enter Email:
          </label>
          <input
            type="email"
            name="username"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-2 border-2 border-gray-300 rounded-md w-full"
            required
          />
          <label htmlFor="password" className='block mb-2 font-medium text-gray-700'>
            Enter Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 border-2 border-gray-300 rounded-md w-full"
            required
          />
          <input type="checkbox" id="remember" name="remember" onChange={rememberMe} className="mr-2" />
            <label htmlFor="remember" className="text-gray-700 mb-2">Remember me</label>
          <button type="submit" className="px-2 py-4 w-full bg-blue-900 text-white rounded-md mb-4">
            Submit
          </button>
          <Link to="/signup">
            <h3 className="text-center text-blue-500">Not a user? Click here to Sign-up</h3>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;