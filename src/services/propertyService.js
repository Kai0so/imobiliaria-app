// src/services/propertyService.js

import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

const propertiesCollectionRef = collection(db, 'properties');

// CREATE: Adicionar um novo imóvel
export const addProperty = (propertyData) => {
  return addDoc(propertiesCollectionRef, {
    ...propertyData,
    createdAt: serverTimestamp() // Adiciona data do servidor na criação
  });
};

// READ: Obter todos os imóveis, ordenados por data de criação
export const getProperties = async () => {
  const q = query(propertiesCollectionRef, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  // Mapeia os documentos para um array, adicionando o ID do documento
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getPropertyById = async (id) => {
  const propertyDocRef = doc(db, 'properties', id);
  const docSnap = await getDoc(propertyDocRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    // doc.data() será undefined neste caso
    console.log("Nenhum documento encontrado com este ID!");
    return null;
  }
};

// UPDATE: Atualizar um imóvel existente
export const updateProperty = (id, propertyData) => {
  const propertyDoc = doc(db, 'properties', id);
  return updateDoc(propertyDoc, propertyData);
};

// DELETE: Remover um imóvel
export const deleteProperty = (id) => {
  const propertyDoc = doc(db, 'properties', id);
  return deleteDoc(propertyDoc);
};