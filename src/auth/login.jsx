import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "../components/Navbar";

const Login = ({ setLoggedin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoggedin(true);
      console.log("User logged in successfully");
      localStorage.setItem("loggedin", "true"); // Save login state to local storage
      navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const rememberMe = () => {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("loggedin", "true");
  };

  return (
    <div>
      <Navbar loggedin={false} />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black">
        <form
          onSubmit={handleLogin}
          className="p-6 w-full xs:max-w-sm sm:max-w-md bg-gradient-to-b from-gray-800 to-gray-700 shadow-lg rounded-lg border border-gray-600"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-white">
            Login
          </h2>
          <label htmlFor="email" className="block mb-2 font-medium text-gray-200">
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-3 w-full text-gray-900 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password" className="block mb-2 font-medium text-gray-200">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-3 w-full text-gray-900 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your password"
            required
          />
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              onChange={rememberMe}
              className="mr-2 accent-blue-600"
            />
            <label htmlFor="remember" className="text-gray-300">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 mb-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
          >
            Login
          </button>
          <Link to="/forgotpin" className="block text-center text-blue-400 hover:underline mb-4">
            Forgot Password?
          </Link>
          <Link to="/signup" className="block text-center text-gray-300 hover:underline">
            Not a user? <span className="text-blue-400">Sign Up</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
