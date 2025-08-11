// src/components/Footer.jsx

import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'; // Ícones de redes sociais

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Sobre */}
          <div>
            <h3 className="text-xl font-bold mb-2">Imobiliária Top</h3>
            <p className="text-gray-400">
              Encontrando o lar dos seus sonhos desde {currentYear - 5}.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-2">Links</h3>
            <ul className="space-y-2">
              <li><a href="/imoveis" className="hover:text-secondary transition-colors">Nossos Imóveis</a></li>
              <li><a href="/contato" className="hover:text-secondary transition-colors">Fale Conosco</a></li>
              <li><a href="/sobre" className="hover:text-secondary transition-colors">Quem Somos</a></li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-xl font-bold mb-2">Siga-nos</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-2xl hover:text-secondary transition-colors"><FaFacebook /></a>
              <a href="#" className="text-2xl hover:text-secondary transition-colors"><FaInstagram /></a>
              <a href="#" className="text-2xl hover:text-secondary transition-colors"><FaWhatsapp /></a>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 border-t border-gray-700 mt-8 pt-6">
          <p>&copy; {currentYear} Imobiliária Top. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;