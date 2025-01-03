import React, { useState, useEffect } from 'react';
import { db, auth } from '../auth/firebase'; // Ensure correct import
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import Reply from './replies'; // Ensure correct import

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // State to store the selected post
  const [userData, setUserData] = useState(null); // State to store user data
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
      <div className="p-4 max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg">
        <button onClick={handleBack} className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600">
          Back
        </button>
        <p className="text-white mt-4">Created by: {post.createdBy}</p>
        <p className="text-white mb-8">Created at: {post.createdAt.toDate().toLocaleString()}</p>
        <h2 className="text-3xl font-bold text-white mt-4 mb-4 xss:text-lg">{post.title}</h2>
        <div className='border-2 border-white rounded-md p-4 mb-8 bg-gray-700'>
          <p className="text-white">{post.content}</p>
        </div>

        <div className='mt-4'>
          <Reply postId={post.id} />
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-white">Posts</h2>
      {selectedPost ? (
        <Singlepage post={selectedPost} />
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="mb-6 p-6 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
            onClick={() => handleSelectPost(post)}
          >
            <h3 className="text-2xl font-semibold text-white">{post.title}</h3>
            <p className="text-sm text-gray-400 mt-2">Posted on {post.createdAt.toDate().toLocaleString()}</p>
            {user && user.uid === post.userId && (
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the post selection
                    handleDelete(post.id);
                  }}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
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
