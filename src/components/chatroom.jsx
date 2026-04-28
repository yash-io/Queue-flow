import React, { useState, useEffect } from "react";
import { db, auth } from "../auth/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
  getDocs,
  limit,
  startAfter
} from "firebase/firestore";

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"), limit(200));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data()
      }));
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const q = query(collection(db, "messages"));
      const snapshot = await getDocs(q);
      snapshot.forEach((d) => {
        const message = d.data();
        if (message.createdAt && now - message.createdAt.toDate() > 24 * 60 * 60 * 1000) {
          deleteDoc(d.ref);
        }
      });
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      createdAt: serverTimestamp(),
      uid: auth.currentUser ? auth.currentUser.uid : "anonymous",
      user: auth.currentUser ? auth.currentUser.email : "anonymous",
      replyTo: replyingTo ? replyingTo.text : null
    });

    setNewMessage("");
    setReplyingTo(null);
  };

  const handleDeleteMessage = async (id, user) => {
    if (auth.currentUser && auth.currentUser.email === user) {
      await deleteDoc(doc(db, "messages", id));
    } else {
      alert("You can only delete your own messages.");
    }
  };

  const handleReplyMessage = (message) => {
    setReplyingTo(message);
    setNewMessage(`@${message.text.slice(0, 5)}... `);
  };

  const handleSyncNow = async () => {
    const last = messages[messages.length - 1];
    const base = query(collection(db, "messages"), orderBy("createdAt"));
    const q = last?.createdAt ? query(base, startAfter(last.createdAt), limit(200)) : query(base, limit(200));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return;
    setMessages((prev) => {
      const byId = new Map(prev.map((m) => [m.id, m]));
      snapshot.docs.forEach((d) => {
        byId.set(d.id, { id: d.id, ...d.data() });
      });
      return Array.from(byId.values()).sort((a, b) => {
        const at = a.createdAt?.toMillis?.() ?? 0;
        const bt = b.createdAt?.toMillis?.() ?? 0;
        return at - bt;
      });
    });
  };

  return (
    <div className="flex flex-col h-screen w-full md:w-2/3 mx-auto border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden mt-16">
      <header className="bg-blue-500 dark:bg-blue-700 text-white p-4 text-center">
        <h1 className="text-xl font-bold">Anonymous Chatroom</h1>
      </header>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
        {messages.map((message) => (
          <div key={message.id} className="mb-4 p-2 bg-white dark:bg-gray-900 rounded shadow relative">
            <p className="text-black dark:text-white">{message.text}</p>
            <button
              onClick={() => handleDeleteMessage(message.id, message.user)}
              className="absolute top-0 right-0 mt-2 mr-2 text-red-500"
            >
              Delete
            </button>
            <button
              onClick={() => handleReplyMessage(message)}
              className="absolute top-0 right-0 mt-2 mr-16 text-blue-500"
            >
              Reply
            </button>
            {message.replyTo && (
              <div className="mt-2 p-2 bg-gray-200 dark:bg-gray-700 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-400">Replying to: {message.replyTo.slice(0, 5)}...</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <form className="flex flex-col p-4 bg-gray-200 dark:bg-gray-700 fixed bottom-0 w-full md:w-2/3" onSubmit={handleSendMessage}>
        {replyingTo && (
          <div className="mb-2 p-2 bg-gray-300 dark:bg-gray-600 rounded">
            <p className="text-sm text-gray-700 dark:text-gray-300">Replying to: {replyingTo.text.slice(0, 5)}...</p>
            <button onClick={() => setReplyingTo(null)} className="text-red-500 text-sm">
              Cancel
            </button>
          </div>
        )}
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded mr-2 bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          <button type="submit" className="p-2 bg-blue-500 dark:bg-blue-700 text-white rounded">
            Send
          </button>
          <button type="button" onClick={handleSyncNow} className="ml-2 p-2 bg-gray-500 dark:bg-gray-600 text-white rounded">
            Sync
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatroom;