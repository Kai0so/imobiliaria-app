// src/components/Header.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importando nosso hook

const Header = () => {
  const { currentUser, logout } = useAuth(); // Usando o hook para pegar o usuário e a função de logout
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redireciona para o login após sair
    } catch (error) {
      console.error('Falha ao fazer logout', error);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          Imobiliária Top
        </Link>

        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
          <Link to="/imoveis" className="text-gray-600 hover:text-primary transition-colors">Imóveis</Link>
          <Link to="/contato" className="text-gray-600 hover:text-primary transition-colors">Contato</Link>
        </nav>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              {/* Se o usuário estiver logado */}
              <span className="text-gray-700 hidden sm:block">Olá, {currentUser.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              {/* Se não estiver logado */}
              <Link to="/login">
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;