import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import Navbar from '../components/Navbar';

const Login = ({ setLoggedin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
   await signInWithEmailAndPassword(auth, email, password);
      setLoggedin(true);
      console.log('User logged in successfully');
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
      <div className="flex justify-center items-center max-w-full bg-black min-h-screen bg-gradient-to-r from-black via-gray-800 to-black">
        <form onSubmit={handleLogin} className="p-8 m-10 border-2 rounded-md w-full xs:max-w-sm  bg-blue-500">
          <h2 className="text-3xl font-medium mb-6 text-center text-red-100">Login</h2>
          <label htmlFor="username" className='block mb-2 font-medium text-white'>
            Enter Email:
          </label>
          <input
            type="email"
            name="username"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-6 p-2 border-2 border-gray-300 rounded-md w-full"
            required
          />
          <label htmlFor="password" className='block mb-2 font-medium text-white'>
            Enter Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 p-2 border-2 border-gray-300 rounded-md w-full"
            required
          />
          <input type="checkbox" id="remember" name="remember" onChange={rememberMe} className="mr-2" />
            <label htmlFor="remember" className="text-white mb-2">Remember me</label>
          <button type="submit" className="px-2 py-4 w-full bg-blue-900 text-white rounded-md mb-4">
            Submit
          </button>
          <Link to='/forgotpin'>
          <h3 className='text-center text-white' >Forgot Password</h3>
          </Link>
          
          <Link to="/signup">
            <h3 className="text-center text-white">Not a user? Click here to Sign-up</h3>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;