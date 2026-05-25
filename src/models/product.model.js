import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import { db } from "../config/firebase.js";

const productsCollection = collection(db, "products");

export const getAllProductsModel = async () => {
  const snapshot = await getDocs(productsCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getProductByIdModel = async (id) => {
  const productRef = doc(db, "products", id);

  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const createProductModel = async (product) => {
  const response = await addDoc(productsCollection, product);

  return response.id;
};

export const deleteProductModel = async (id) => {
  const productRef = doc(db, "products", id);

  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    return null;
  }

  await deleteDoc(productRef);

  return true;
};

export const updateProductModel = async (id, product) => {
  const productRef = doc(db, "products", id);

  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    return null;
  }

  await updateDoc(productRef, product);

  return {
    id,
    ...product,
  };
};

export const getProductByCategoryModel = async (category) => {
  const q = query(productsCollection, where("category", "==", category));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const updatePatchProductModel = async (id, product) => {
  const productRef = doc(db, "products", id);

  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    return null;
  }

  await updateDoc(productRef, product);

  return {
    id,
    ...snapshot.data(),
    ...product,
  };
};
