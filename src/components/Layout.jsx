// src/components/Layout.jsx

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation(); // Pega a localização atual

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <main className="flex-grow">
        {/* AnimatePresence gerencia a animação de entrada e saída dos componentes */}
        {/* O 'mode="wait"' espera a animação de saída terminar antes de iniciar a de entrada */}
        <AnimatePresence mode="wait">
          {/* A 'key' é essencial para o AnimatePresence saber qual componente mudou */}
          <div key={location.pathname}>
            <Outlet />
          </div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;