import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

import { db } from "../config/firebase.js";

const usersCollection = collection(db, "users");

export const createUserModel = async (user) => {
  const response = await addDoc(usersCollection, user);

  return response.id;
};

export const getUserByEmailModel = async (email) => {
  const q = query(usersCollection, where("email", "==", email));

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const userDoc = snapshot.docs[0];

  return {
    id: userDoc.id,
    ...userDoc.data(),
  };
};
