// src/components/Loading.jsx
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div>

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-700 to-black">
      <div className="text-center">
        <ClipLoader color="#ffffff" size={50} />
        <h2 className="text-2xl font-semibold text-white mt-4">Loading...</h2>
      </div>
    </div>
    </div>
  );
};

export default Loading;