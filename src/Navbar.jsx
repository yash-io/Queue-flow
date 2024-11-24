import React from "react";
import { getAuth,signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
const Navbar = ({loggedin,setLoggedin}) => {
  const auth=getAuth();
  const navigate=useNavigate();
  const logout=()=>{
    signOut(auth).then(()=>{
      console.log("Logged out successfully");
      alert("Logged out successfully");
      navigate('/');
      setLoggedin(false);
      localStorage.setItem('loggedin', false);
    }).catch((error)=>{
      console.error("Error logging out:",error);
    });
  };
  return (
    <div>
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">Queue-flow</div>
        <div className="flex space-x-4">
          {!loggedin && <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>}
          
          {!loggedin && <a href="/login" className="text-gray-700 hover:text-gray-900">Login</a>}
          {!loggedin && <a href="/signup" className="text-gray-700 hover:text-gray-900">Signup</a>}
          {loggedin && <button onClick={logout} className="px-4 py-2 bg-blue-500 text-white rounded-md" >logout</button>  }
     
        </div>
     </div>
    </nav>
    </div>
  );
}

export default Navbar;