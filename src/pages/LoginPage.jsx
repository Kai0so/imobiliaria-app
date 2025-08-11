// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import PageWrapper from '../components/PageWrapper';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Pega a localização atual
  // Define o destino do redirecionamento: a página anterior ou a home
  const from = location.state?.from?.pathname || "/";

  // ... (o resto do seu código useState continua igual)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // ATUALIZAÇÃO: navega para 'from' em vez de '/'
      navigate(from, { replace: true });
    } catch (err) {
      setError('E-mail ou senha inválidos.');
      console.error("Erro no login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-full max-w-md">
          <form onSubmit={handleLogin} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">Login</h2>

            {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</p>}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="seu@email.com"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="******************"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:bg-gray-400"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
            <p className="text-center text-gray-600 text-sm mt-6">
              Não tem uma conta?{' '}
              <Link to="/register" className="font-bold text-primary hover:text-blue-800">
                Cadastre-se
              </Link>
            </p>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LoginPage;