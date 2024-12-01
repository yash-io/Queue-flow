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
          password: data.password,
        });
      })
      .then(() => {
        console.log("User signed up successfully");
        navigate('/login');
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-black via-gray-800 to-black ">
      <div>
        <Navbar loggedin={false} />
      </div>
      <form onSubmit={handleSignup} className="p-8 m-10 border-2 rounded-md w-full max-w-md xs:max-w-sm bg-gradient-to-r from-blue-500 to-purple-600">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-100">Sign Up</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <label htmlFor="id" className="block mb-2 font-bold text-white">
          Create UserId:
        </label>
        <input
          type="text"
          name="id"
          id="id"
          value={data.id}
          onChange={handleInput}
          className="mb-4 p-2 border-2 border-gray-300 rounded-md w-full"
          required
        />
        <label htmlFor="email" className="block mb-2 font-bold text-white">
          Enter Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={data.email}
          onChange={handleInput}
          className="mb-4 p-2 border-2 border-gray-300 rounded-md w-full"
          required
        />
        <label htmlFor="password" className="block mb-2 font-bold text-white">
          Create Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={data.password}
          onChange={handleInput}
          className="mb-4 p-2 border-2 border-gray-300 rounded-md w-full"
          required
        />
        <label htmlFor="confirmPassword" className="block mb-2 font-bold text-white">
          Confirm Password:
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={data.confirmPassword}
          onChange={handleInput}
          className="mb-4 p-2 border-2 border-gray-300 rounded-md w-full"
          required
        />
        <button type="submit" className="px-2 py-4 w-full bg-blue-900 text-white rounded-md mb-4">
          Submit
        </button>
        <Link to="/login">
          <h3 className="text-center text-white">Already a user? Click here to Login</h3>
        </Link>
      </form>
    </div>
  );
};

export default Signup;