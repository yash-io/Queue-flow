import React, { useState, useEffect } from 'react';
import { db, auth } from '../auth/firebase'; 
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import Reply from './replies'; 


const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); 
  const [userData, setUserData] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.error('No such user document!');
        }
      }).catch((error) => {
        console.error('Error fetching user data:', error);
      });
    }
  }, [user]);

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
    if (!user || !userData) {
      console.error('User not authenticated or user data not available');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await deleteDoc(doc(db, 'posts', postId));
      await updateDoc(userDocRef, { postsCount: (userData.postsCount || 0) - 1 });
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
      <div className="p-4 w-full max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg sticky top-20">
        <button
          onClick={handleBack}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
        >
          Back
        </button>
        <div className="p-4 border-2 border-gray-700 rounded-md">
          <h2 className="text-3xl font-bold text-white mb-4">{post.title}</h2>
          <p className="text-white mb-4">{post.content}</p>
          <p className="text-sm text-gray-400">Created by: {post.createdBy}</p>
          <p className="text-sm text-gray-400">Created at: {post.createdAt.toDate().toLocaleString()}</p>
        </div>
        <div className="mt-4">
          <Reply postId={post.id} />
        </div>
      </div>
    );
  };
  
  return (
    <div className="p-6 w-full min-h-screen bg-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">Posts</h2>
      {selectedPost ? (
        <Singlepage post={selectedPost} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
              onClick={() => handleSelectPost(post)}
            >
              <h3 className="text-2xl font-semibold text-white">{post.title}</h3>
              <p className="text-sm text-gray-400 mt-2">
                Posted on {post.createdAt.toDate().toLocaleString()}
              </p>
              {user && user.uid === post.userId && (
                <div className="mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent triggering the post selection
                      handleDelete(post.id);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  
};

export default PostsList;
