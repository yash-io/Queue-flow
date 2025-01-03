import React, { useState, useEffect } from 'react';
import { db, auth } from '../auth/firebase'; // Ensure correct import
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp, doc, deleteDoc } from 'firebase/firestore';

const Reply = ({ postId, parentReplyId = null }) => {

};