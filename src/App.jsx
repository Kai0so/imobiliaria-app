// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';

// Importando nosso componente de proteção
import ProtectedRoute from './components/ProtectedRoute';

// Páginas
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage'; // Importando a nova página
import PropertyDetailPage from './pages/PropertyDetailPage';
import './App.css'; // Importando o CSS global


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Rotas Públicas */}
            <Route index element={<HomePage />} />
            <Route path="imoveis" element={<PropertiesPage />} />
            <Route path="contato" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="imovel/:id" element={<PropertyDetailPage />} />

            {/* Rota Protegida */}
            <Route
              path="admin"
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Adicione outras rotas protegidas aqui da mesma forma */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;