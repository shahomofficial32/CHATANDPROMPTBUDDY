import { db } from './config';
import { 
  collection, doc, addDoc, getDocs, updateDoc, deleteDoc, 
  query, where, orderBy, serverTimestamp 
} from 'firebase/firestore';

export const createChatSession = async (userId, title = "New Chat") => {
  try {
    const sessionRef = await addDoc(collection(db, "sessions"), {
      userId,
      title,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return sessionRef.id;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};

export const getUserSessions = async (userId) => {
  try {
    const q = query(
      collection(db, "sessions"), 
      where("userId", "==", userId),
      orderBy("updatedAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return [];
  }
};

export const addChatMessage = async (sessionId, message) => {
  try {
    const messagesRef = collection(db, "sessions", sessionId, "messages");
    await addDoc(messagesRef, {
      ...message,
      timestamp: serverTimestamp()
    });
    
    await updateDoc(doc(db, "sessions", sessionId), {
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error adding message:", error);
    throw error;
  }
};

export const getChatMessages = async (sessionId) => {
  try {
    const q = query(
      collection(db, "sessions", sessionId, "messages"),
      orderBy("timestamp", "asc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

export const updateSessionTitle = async (sessionId, title) => {
  try {
    await updateDoc(doc(db, "sessions", sessionId), { title });
  } catch (error) {
    console.error("Error updating title:", error);
  }
};

export const deleteChatSession = async (sessionId) => {
  try {
    await deleteDoc(doc(db, "sessions", sessionId));
  } catch (error) {
    console.error("Error deleting session:", error);
  }
};