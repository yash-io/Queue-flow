import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

const Navbar = ({ loggedin,setLoggedin }) => {
    const navigate = useNavigate();
    const Logout = () => {
      
        signOut(auth)
          .then(() => {
            localStorage.setItem('loggedin', 'false');
            setLoggedin(false);
            navigate("/login");
          })
          .catch((error) => {
            console.error("Error signing out:", error);
          });
    
    };
  return (
    <nav className="fixed top-0 left-0 w-full text-white bg-black shadow-md p-4 z-50 border-b-white border-b-2 rounded-md">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">Queue-flow</div>
        <div className="flex space-x-4 ">
          <a href="/home" className="text-white font-bold mr-8">Home</a>
          {!loggedin && <a href="/login" className="text-white font-bold text-white mr-4">Login</a>}
          {!loggedin && <a href="/signup" className="text-white font-bold text-white mr-4">Signup</a>}
          {loggedin && <button onClick={Logout} className="text-white hover:border-white font-bold rounded-md m-0">Logout</button>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;