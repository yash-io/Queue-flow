import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";

const Navbar = ({ loggedin, setLoggedin, isLoading }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const Logout = () => {
    setIsMenuOpen(false)
    setIsMobileMenuOpen(false)
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
        <div className="text-lg font-thin text-white mx-4">Queue-flow</div>
      </nav>
    );
  } else {
    return (
      <nav className="fixed top-0 left-0 w-full text-white bg-black shadow-md p-4 z-50 border-b-white border-b-2 rounded-md">
        <div className="flex justify-between items-center">
          <div className="text-lg font-md text-white mx-4">Queue-flow</div>

          <button
            className="hidden md:flex text-white text-xl font-bold mr-6"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Menu ☰
            {!isMenuOpen ? ' ' : ' ❌'}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white font-bold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {!isMobileMenuOpen ? '☰' : '❌'}
          </button>
        </div>

        {/* Desktop Sidebar Menu */}
        {isMenuOpen && (
          <div className="hidden md:flex flex-col fixed top-0 right-0 h-full w-64 bg-black shadow-lg p-4 space-y-4 z-50">
            <button
            className="hidden md:flex text-white font-bold mr-6 right-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ❌
          </button>
            {loggedin && <a href="/home" className="text-white font-bold">Home</a>}
            {!loggedin && <a href="/login" className="text-white font-bold">Login</a>}
            {!loggedin && <a href="/signup" className="font-bold text-white">Signup</a>}
            {loggedin && <a href="/profilepage" className="text-white font-bold">Profile</a>}
            {loggedin && <a href="/createpost" className="text-white font-bold">Create post</a>}
            {loggedin && <a href="/chatroom" className="text-white font-bold">Anonymous chat</a>}
            {loggedin && (
              <button
                onClick={Logout}
                className="text-white text-lg border-2 hover:border-white font-bold rounded-md mt-8"
              >
                Logout
              </button>
            )}
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-8">
            {loggedin && <a href="/home" className="text-white font-bold">Home</a>}
            {!loggedin && <a href="/login" className="text-white font-bold">Login</a>}
            {!loggedin && <a href="/signup" className="font-bold text-white">Signup</a>}
            {loggedin && <a href="/profilepage" className="text-white font-bold">Profile</a>}
            {loggedin && <a href="/createpost" className="text-white font-bold">Create post</a>}
            {loggedin && <a href="/chatroom" className="text-white font-bold">Anonymous chat</a>}
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