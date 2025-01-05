// src/components/CreatePost.jsx
import React, { useState } from 'react';
import { db,auth } from '../auth/firebase';
import {doc,getDoc, collection, addDoc, Timestamp,updateDoc } from 'firebase/firestore';

const CreatePost = ({createpost,setCreatepost}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  
  const user = auth.currentUser;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('You must be logged in to create a post.');
      return;
    }
    try {
      // Retrieve the user's data from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userId = userData.id; // The custom 'id' from signup

        // Create the post with 'createdBy' set to the user's custom 'id'
        await addDoc(collection(db, 'posts'), {
          title,
          content,
          userId: user.uid,
          createdBy: userId,
          createdAt: Timestamp.fromDate(new Date()),
        });

        // Update the user's postsCount
        await updateDoc(userDocRef, { postsCount: (userData.postsCount || 0) + 1 });

        setTitle('');
        setContent('');
        setCreatepost(!createpost);
        alert('Post created successfully!');
      } else {
        console.error('No such user document!');
        setMessage('User data not found.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setMessage('Failed to create post.');
    }
  };

  return (
    <div className="p-4 border-2 border-gray-700 rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-white">Create a Post</h2>
      {message && <p className="mb-4 text-white">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-white mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2  bg-gray-700 border border-gray-300 rounded text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-white mb-2">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;