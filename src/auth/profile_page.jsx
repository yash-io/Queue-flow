import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase'; // Adjust the path to your Firebase configuration
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from '../components/Navbar'; // Import Navbar if you have one

const ProfilePage = ({ loggedin, setLoggedin }) => {
  const [ProfilePicChange, setProfilePicChange] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    email: '',
    profilePic: '',
    postsCount: 0,
    commentsCount: 0,
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [message, setMessage] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.log('User not logged in');
      }
    };

    fetchUserData();
  }, [user]);

  const handleProfilePicChange = (e) => {
    if (e.target.files[0]) {
      setProfilePicFile(e.target.files[0]);
    }
  };

  const handleUploadProfilePic = async (e) => {
    e.preventDefault();
    if (profilePicFile && user) {
      try {
        // Read the file as a Base64 string
        const reader = new FileReader();
        reader.readAsDataURL(profilePicFile);
        reader.onloadend = async () => {
          const base64String = reader.result;
  
          // Update the profilePic in Firestore
          const userDocRef = doc(db, 'users', user.uid);
          await updateDoc(userDocRef, { profilePic: base64String });
  
          setUserData((prevData) => ({ ...prevData, profilePic: base64String }));
          setMessage('Profile picture updated successfully!');
        };
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        setMessage('Failed to upload profile picture.');
      }
    }
  };
  const picchange=()=>{
    setProfilePicChange(!ProfilePicChange);
  }

  return (
    <div>
      <Navbar loggedin={loggedin} setLoggedin={setLoggedin} />
      <div className="p-8 max-w-full mx-auto text-white bg-gradient-to-r from-black via-gray-800 to-black min-h-screen pt-20">
        <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
        {message && <p className="mb-4">{message}</p>}

        {/* Display Profile Picture */}
        {userData.profilePic ? (
          <img
            src={userData.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center mb-4">
            <span className="text-gray-500">No Image</span>
          </div>
        )}

        {/* Upload Profile Picture Form */}
        <button type="submit" onClick={picchange} className="bg-blue-500 text-white px-4 py-2 rounded">
            {!ProfilePicChange ? 'Change pic' : 'No change'}
        </button>
        {ProfilePicChange && 
        <form onSubmit={handleUploadProfilePic} className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Upload Profile Picture</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          className="mb-2 text-white"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload Picture
        </button>
       </form>
        
        }
        

        {/* Display User Information */}
        <p className="mb-2">
          <strong>Username:</strong> {userData.id}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {userData.email}
        </p>
        <p className="mb-2">
          <strong>Posts:</strong> {userData.postsCount}
        </p>
        <p className="mb-2">
          <strong>Comments:</strong> {userData.commentsCount}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;