import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";

const Navbar = ({ loggedin, setLoggedin, isLoading }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const Logout = () => {
    signOut(auth)
      .then(() => {
        setLoggedin(false);
        console.log("User signed out successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  if (isLoading) {
    return (
      <nav className="fixed top-0 left-0 w-full text-white bg-black shadow-md p-4 z-50 border-b-white border-b-2 rounded-md">
        <div className="text-lg font-thin text-white">Queue-flow</div>
      </nav>
    );
  }
  
  else {
    return (
      <nav className="fixed top-0 left-0 w-full text-white bg-black shadow-md p-4 z-50 border-b-white border-b-2 rounded-md">
        <div className="flex justify-between items-center">
        
          <div className="text-lg font-thin text-white">Queue-flow</div>

          {/* Desktop */}
          <div className="hidden md:flex space-x-6">
            {loggedin && <a href="/home" className="text-white font-bold mr-4">Home</a>}
            {!loggedin && <a href="/login" className="text-white font-bold mr-8">Login</a>}
            {!loggedin && <a href="/signup" className="font-bold text-white mr-8">Signup</a>}
            {loggedin && <a href="/profilepage" className="text-white font-bold mr-8">Profile</a>}
            {loggedin && <a href="/createpost" className="text-white font-bold mr-4">Create post</a>}
            {loggedin && (
              <button
                onClick={Logout}
                className="text-white hover:border-white font-bold rounded-md m-0"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white font-bold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
        
            {
              !isMobileMenuOpen ?(<>☰</>):(<>❌</>)
            }
          </button>
        </div>

        {/* Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-8">
            {loggedin && <a href="/home" className="text-white font-bold">Home</a>}
            {!loggedin && <a href="/login" className="text-white font-bold">Login</a>}
            {!loggedin && <a href="/signup" className="font-bold text-white">Signup</a>}
            {loggedin && <a href="/createpost" className="text-white font-bold">Create post</a>}
            {loggedin && <a href="/profilepage" className="text-white font-bold">Profile</a>}
            {loggedin && (
              <button
                onClick={Logout}
                className="text-white text-lg hover:border-white font-bold rounded-md"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    );
  }
};

export default Navbar;
