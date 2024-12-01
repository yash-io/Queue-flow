// src/components/Loading.jsx
import React from 'react';
import Navbar from './Navbar';
import { ClipLoader } from 'react-spinners';

const Loading = ({loggedin}) => {
  return (
    <div>
    {loggedin && <Navbar loggedin={loggedin} />}
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-gray-500 to-indigo-500">
      <div className="text-center">
        <ClipLoader color="#ffffff" size={50} />
        <h2 className="text-2xl font-semibold text-white mt-4">Loading...</h2>
      </div>
    </div>
    </div>
  );
};

export default Loading;