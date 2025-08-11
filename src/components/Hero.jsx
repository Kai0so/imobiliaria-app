// src/components/Hero.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../assets/hero-banner.jpg'; // Importando a imagem

const Hero = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[60vh] md:h-[80vh] flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${HeroBanner})` }}
    >
      {/* Overlay para escurecer a imagem e melhorar a legibilidade do texto */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Encontre o Imóvel dos Seus Sonhos
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
          As melhores oportunidades de compra e aluguel estão aqui.
        </p>
        <Link to="/imoveis">
          <button className="bg-secondary text-primary font-bold px-8 py-3 rounded-lg text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105">
            Ver Imóveis Agora
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;