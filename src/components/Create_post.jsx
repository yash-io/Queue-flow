// src/components/CreatePost.jsx
import React, { useState } from 'react';
import { db,auth } from '../auth/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const CreatePost = () => {
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
      await addDoc(collection(db, 'posts'), {
        title,
        content,
        userId: user.uid,
        username: user.id,
        createdAt: Timestamp.fromDate(new Date()),
      });
      setTitle('');
      setContent('');
      setMessage('Post created successfully!');
    } catch (error) {
      setTimeout(()=>{
      console.error('Error creating post:', error);
      setMessage('Failed to create post.');
      },500);
      
    }
  };

  return (
    <div className="p-4">
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
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-white mb-2">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
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