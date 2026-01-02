import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

const postsCollection = collection(db, "posts");

const ensureUser = () => auth?.currentUser?.uid || null;

const mapDoc = (docSnap) => {
  const data = docSnap.data();
  const createdAt = data?.createdAt?.toDate ? data.createdAt.toDate() : null;
  return {
    id: docSnap.id,
    ...data,
    timestamp: createdAt ? createdAt.toLocaleString() : data?.timestamp || "",
  };
};

export const getAllPosts = async () => {
  const uid = ensureUser();
  if (!uid) return [];

  const q = query(postsCollection, where("userId", "==", uid));
  const snapshot = await getDocs(q);
  const posts = snapshot.docs.map(mapDoc);
  // Sort client-side by createdAt descending
  return posts.sort((a, b) => {
    const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
    const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
    return bTime - aTime;
  });
};

export const createPost = async (postData) => {
  const uid = ensureUser();
  if (!uid) throw new Error("User not authenticated");

  const payload = {
    ...postData,
    userId: uid,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(postsCollection, payload);
  // Return hydrated object with readable timestamp
  return mapDoc({ id: docRef.id, data: () => payload });
};

export const updatePost = async (postId, postData) => {
  const uid = ensureUser();
  if (!uid) throw new Error("User not authenticated");

  const ref = doc(db, "posts", postId);
  await updateDoc(ref, { ...postData, updatedAt: serverTimestamp() });
  return { id: postId, ...postData };
};

export const deletePost = async (postId) => {
  const uid = ensureUser();
  if (!uid) throw new Error("User not authenticated");

  const ref = doc(db, "posts", postId);
  await deleteDoc(ref);
};

// Subscribe to the signed-in user's posts with a safe error handler so index/build errors don't crash the app
export const subscribeToPosts = (callback, onError = (err) => console.error("posts subscription error", err)) => {
  const uid = ensureUser();
  if (!uid) {
    callback([]);
    return () => {};
  }

  const q = query(postsCollection, where("userId", "==", uid));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const posts = snapshot.docs.map(mapDoc);
      // Sort client-side by createdAt descending
      const sorted = posts.sort((a, b) => {
        const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return bTime - aTime;
      });
      callback(sorted);
    },
    onError
  );

  return unsubscribe;
};

// Fetch ALL public posts (from all users) for public listings page
export const getAllPublicPosts = async () => {
  const snapshot = await getDocs(postsCollection);
  const posts = snapshot.docs.map(mapDoc);
  // Sort client-side by createdAt descending
  return posts.sort((a, b) => {
    const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
    const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
    return bTime - aTime;
  });
};

// Subscribe to ALL public posts (real-time) for public listings
export const subscribeToPublicPosts = (callback, onError = (err) => console.error("public posts error", err)) => {
  const unsubscribe = onSnapshot(
    postsCollection,
    (snapshot) => {
      const posts = snapshot.docs.map(mapDoc);
      // Sort client-side by createdAt descending
      const sorted = posts.sort((a, b) => {
        const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return bTime - aTime;
      });
      callback(sorted);
    },
    onError
  );

  return unsubscribe;
};