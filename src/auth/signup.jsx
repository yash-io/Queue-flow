import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase'; // Ensure correct import
import Navbar from '../components/Navbar';
const Signup = ({ setLoggedin }) => {
  const [data, setData] = useState({
    email: '',
    id: '',
    password: '',
    confirmPassword: '',
    postsCount: 0,
    commentsCount: 0,
    
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (data.password.length < 6) {
      alert("Password should be at least 6 characters long.");
      setError("Password should be at least 6 characters long.");
      return;
    }
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match.");
      setError("Passwords do not match.");
      return;
    }
  
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        return setDoc(doc(db, 'users', user.uid), {
          email: data.email,
          id: data.id,
          profilePic: 'https://via.placeholder.com/150',
          password: data.password,
          postsCount:0,
          commentsCount:0,
        });
      })
      .then(() => {
        console.log("User signed up successfully");
        navigate('/');
        setLoggedin(true);

      })
      .catch((error) => {
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (error.code === 'auth/email-already-in-use') {
          alert("The email address is already in use by another account.");
          errorMessage = "The email address is already in use by another account.";
          navigate('/login');
        }
        setError(errorMessage);
        console.error("Error signing up:", error);
      });
  };

  return (
    <div>
      <Navbar loggedin={false} />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black">
        <form
          onSubmit={handleSignup}
          className="p-6 w-full xs:max-w-sm sm:max-w-md bg-gradient-to-b from-gray-800 to-gray-700 shadow-lg rounded-lg border border-gray-600"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-white">
            Sign Up
          </h2>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          <label htmlFor="id" className="block mb-2 font-medium text-gray-200">
            Create UserId:
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={data.id}
            onChange={handleInput}
            className="mb-4 p-3 w-full text-gray-900 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter a unique user ID"
            required
          />
          <label htmlFor="email" className="block mb-2 font-medium text-gray-200">
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleInput}
            className="mb-4 p-3 w-full text-gray-900 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password" className="block mb-2 font-medium text-gray-200">
            Create Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleInput}
            className="mb-4 p-3 w-full text-gray-900 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter a strong password"
            required
          />
          <label
            htmlFor="confirmPassword"
            className="block mb-2 font-medium text-gray-200"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleInput}
            className="mb-4 p-3 w-full text-gray-900 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Re-enter your password"
            required
          />
          <button
            type="submit"
            className="w-full py-3 mb-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
          >
            Sign Up
          </button>
          <Link to="/login" className="block text-center text-gray-300 hover:underline">
            Already a user? <span className="text-blue-400">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
  
  
};

export default Signup;