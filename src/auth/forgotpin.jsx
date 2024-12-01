import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Navbar from "../components/Navbar";
const Forgotpin = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await sendPasswordResetEmail(auth, email);
          setMessage('Password reset email sent. Please check your inbox.');
        } catch (error) {
          if (error.code === 'auth/user-not-found') {
            setError('No user found with this email.');
          } else if (error.code === 'auth/invalid-email') {
            setError('Invalid email address.');
          } else {
            setError('Failed to send password reset email. Please try again.');
          }
          console.error('Error sending password reset email:', error);
        }
      };

  return (
    <div>
      <Navbar loggedin={false} />
      <div className="flex justify-center items-center bg-gradient-to-r from-black via-gray-800 to-black min-h-screen"> 
        <div className="flex flex-col bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-md w-full xs:max-w-sm">
          <h2 className="text-3xl font-medium mb-6 text-center text-red-100">Forgot Pin</h2>
          {message && <div className="mb-4 text-green-500">{message}</div>}
          {error && <div className="mb-4 text-red-500">{error}</div>}
         
          <label htmlFor="username" className='block mb-2 font-medium text-white'>
            Enter Email:
          </label>
          <input
            type="email"
            name="username"
            id="username"
            onChange={(e) => setEmail(e.target.value)}
            className="mb-6 p-2 border-2 border-gray-300 rounded-md w-full"
            required
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onSubmit={handleSubmit}>
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full text-center text-white hover:underline"
          ></button>
        </div>  
        </div>
    </div>
    );
}
export default Forgotpin;