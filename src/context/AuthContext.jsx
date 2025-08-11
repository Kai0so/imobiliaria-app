// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = createContext();

// Hook customizado para facilitar o uso do contexto
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

// Componente Provedor
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para logout
  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    // onAuthStateChanged é um listener do Firebase que observa
    // as mudanças de estado de autenticação (login, logout)
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false); // Carregamento concluído após a primeira verificação
    });

    // Função de limpeza para remover o listener quando o componente for desmontado
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    logout,
  };

  // Não renderiza a aplicação enquanto o status de auth não for verificado
  // Isso evita "piscar" a tela, mostrando o estado de deslogado antes do logado
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};