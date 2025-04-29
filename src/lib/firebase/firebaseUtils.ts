import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Firestore
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  FirebaseStorage
} from 'firebase/storage';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  Auth,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { firestore, storage, auth } from './firebase';

// Auth functions
export const logoutUser = () => {
  if (!auth) throw new Error('Auth is not initialized');
  return signOut(auth);
};

export const signInWithGoogle = async () => {
  if (!auth) throw new Error('Auth is not initialized');
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

// Firestore functions
export const addDocument = async (collectionName: string, data: any) => {
  if (!firestore) throw new Error('Firestore is not initialized');
  try {
    const docRef = await addDoc(collection(firestore, collectionName), data);
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

export const getDocuments = async (collectionName: string) => {
  if (!firestore) throw new Error('Firestore is not initialized');
  try {
    const querySnapshot = await getDocs(collection(firestore, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
};

export const getDocument = async (collectionName: string, documentId: string) => {
  if (!firestore) throw new Error('Firestore is not initialized');
  try {
    const docRef = doc(firestore, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

export const updateDocument = async (collectionName: string, documentId: string, data: any) => {
  if (!firestore) throw new Error('Firestore is not initialized');
  try {
    const docRef = doc(firestore, collectionName, documentId);
    await updateDoc(docRef, data);
    return { id: documentId, ...data };
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const deleteDocument = async (collectionName: string, documentId: string) => {
  if (!firestore) throw new Error('Firestore is not initialized');
  try {
    await deleteDoc(doc(firestore, collectionName, documentId));
    return documentId;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

// Storage functions
export const uploadFile = async (path: string, file: File) => {
  if (!storage) throw new Error('Storage is not initialized');
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteFile = async (path: string) => {
  if (!storage) throw new Error('Storage is not initialized');
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return path;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

// Auth functions
export const signUp = async (email: string, password: string) => {
  if (!auth) throw new Error('Auth is not initialized');
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  if (!auth) throw new Error('Auth is not initialized');
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  if (!auth) throw new Error('Auth is not initialized');
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};
