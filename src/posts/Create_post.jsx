import React, { useState } from "react";
import { db, auth } from "../auth/firebase";
import { doc, getDoc, collection, addDoc, Timestamp, updateDoc } from "firebase/firestore";

const CreatePost = ({ createpost, setCreatepost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const user = auth.currentUser;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage("You must be logged in to create a post.");
      return;
    }
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userId = userData.id;

        await addDoc(collection(db, "posts"), {
          title,
          content,
          userId: user.uid,
          createdBy: userId,
          createdAt: Timestamp.fromDate(new Date()),
        });

        await updateDoc(userDocRef, { postsCount: (userData.postsCount || 0) + 1 });

        setTitle("");
        setContent("");
        setCreatepost(!createpost);
        alert("Post created successfully!");
      } else {
        setMessage("User data not found.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Failed to create post.");
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Create a Post</h2>
        
        {message && <p className="text-red-500 text-center mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg">
          {/* Title Input */}
          <div className="flex flex-col">
            <label htmlFor="title" className="text-white mb-2 font-semibold">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Content Input */}
          <div className="flex flex-col">
            <label htmlFor="content" className="text-white mb-2 font-semibold">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="p-3 h-32 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
