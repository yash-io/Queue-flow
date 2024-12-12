// src/components/Posts.jsx
import React, { useState, useEffect } from 'react';
import { db, auth } from '../auth/firebase'; // Adjust the path if necessary
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // State to store the selected post
  const user = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleSelectPost = (post) => {
    setSelectedPost(post);
  };

  const handleBack = () => {
    setSelectedPost(null);
  };

  const Singlepage = ({ post }) => {
    return (
      <div className="p-4">
        <button onClick={handleBack} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Back
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white">{post.title}</h2>
        <p className="text-white">{post.content}</p>
        <p className="text-white">Created by: {post.username}</p>
        <p className="text-white">Created at: {post.createdAt.toDate().toLocaleString()}</p>
        {/* You can add more details here, such as comments and likes */}
      </div>
    );
  };

  return (
    <div className="p-4">
      {selectedPost &&  <h2 className="text-2xl font-bold mb-4 text-white">Posts</h2>}
      {selectedPost ? (
        <Singlepage post={selectedPost} />
      ) : (
       
        posts.map((post) => (
          <div
            key={post.id}
            className="mb-4 p-4 border border-gray-300 rounded cursor-pointer"
            onClick={() => handleSelectPost(post)}
          >
            <h3 className="text-xl font-bold text-white">{post.title}</h3>
            <p className="text-white">{post.content}</p>
            <p className="text-white text-sm">
              Posted on {post.createdAt.toDate().toLocaleString()}
            </p>
            {user && user.uid === post.userId && (
              <div className="mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the post selection
                    handleDelete(post.id);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                >
                  Delete
                </button>
                {/* Add Edit button and functionality here */}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PostsList;