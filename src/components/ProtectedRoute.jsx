// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // Se não houver usuário logado, redirecione para a página de login.
    // Usamos `state={{ from: location }}` para guardar a página que o usuário
    // tentou acessar. Após o login, podemos redirecioná-lo de volta.
    // `replace` substitui a entrada no histórico de navegação.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se houver um usuário logado, renderize o componente filho (a página protegida).
  return children;
};

export default ProtectedRoute;