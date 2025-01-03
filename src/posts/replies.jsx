import React, { useState, useEffect } from 'react';
import { db, auth } from '../auth/firebase'; // Ensure correct import
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp, doc, deleteDoc } from 'firebase/firestore';

const Reply = ({ postId, parentReplyId = null }) => {
  const [replies, setReplies] = useState([]);
  const [content, setContent] = useState('');
  const [replyingTo, setReplyingTo] = useState(null); // Track which reply is being replied to
  const user = auth.currentUser;

  useEffect(() => {
    const q = query(
      collection(db, 'posts', postId, 'replies'),
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const repliesData = [];
      querySnapshot.forEach((doc) => {
        const replyData = doc.data();
        if (replyData.parentReplyId === parentReplyId) {
          repliesData.push({ ...replyData, id: doc.id });
        }
      });
      setReplies(repliesData);
    });

    return () => unsubscribe();
  }, [postId, parentReplyId]);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to reply.');
      return;
    }

    try {
      await addDoc(collection(db, 'posts', postId, 'replies'), {
        content,
        userId: user.uid,
        createdBy: user.displayName || user.email,
        createdAt: Timestamp.fromDate(new Date()),
        parentReplyId,
      });
      setContent('');
      setReplyingTo(null); // Hide the reply form after submitting
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const handleDeleteReply = async (replyId) => {
    if (!user) {
      alert('You must be logged in to delete a reply.');
      return;
    }

    try {
      await deleteDoc(doc(db, 'posts', postId, 'replies', replyId));
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };

  return (
    <div className="ml-6 mt-4 space-y-6">
      {/* Main reply form for the first-level replies */}
      {parentReplyId === null && (
        <form onSubmit={handleReply} className="p-4 bg-gray-900 rounded-lg shadow-md">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write a reply..."
            required
          />
          <button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none">
            Reply
          </button>
          <h2 className="mt-6 text-xl text-white font-semibold">Replies</h2>
        </form>
      )}

      {replies.map((reply) => (
        <div key={reply.id} className="bg-gray-800 rounded-lg shadow-md p-4 mb-6">
          <p className="text-white">{reply.content}</p>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>Replied by: {reply.createdBy}</span>
            <span>Replied at: {reply.createdAt.toDate().toLocaleString()}</span>
          </div>
          {user && user.uid === reply.userId && (
            <button
              onClick={() => handleDeleteReply(reply.id)}
              className="mt-3 bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-700 focus:outline-none"
            >
              Delete Reply
            </button>
          )}

          {/* Show Reply Button */}
          <button
            onClick={() => setReplyingTo(replyingTo === reply.id ? null : reply.id)} // Toggle reply form
            className="mt-3 bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 focus:outline-none ml-10 "
          >
            {replyingTo === reply.id ? 'Cancel' : 'Reply'}
          </button>

          {/* Show Reply Form */}
          {replyingTo === reply.id && (
            <form onSubmit={handleReply} className="mt-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write a reply..."
                required
              />
              <button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none">
                Reply
              </button>
            </form>
          )}

          {/* Recursively show nested replies */}
          <Reply postId={postId} parentReplyId={reply.id} />
        </div>
      ))}
    </div>
  );
};

export default Reply;