// src/components/PropertyCard.jsx

import React from 'react';
// Importe o 'motion'
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  // ... (lógica de formatação de preço continua a mesma)
  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price);

  return (
    // Transforme o div principal em motion.div
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ y: -8 }} // Move 8px para cima no hover
      transition={{ type: 'spring', stiffness: 300 }} // Animação tipo "mola"
    >
      <Link to={`/imovel/${property.id}`}>
        <div className="overflow-hidden">
          <motion.img
            src={property.image || property.images[0]} // Garante compatibilidade
            alt={property.title}
            className="w-full h-56 object-cover"
            whileHover={{ scale: 1.1 }} // Efeito de zoom na imagem
          />
        </div>
        <div className="p-6">
          {/* ... o resto do seu JSX continua o mesmo ... */}
          <h3 className="text-xl font-bold text-primary mb-2">{property.title}</h3>
          <p className="text-gray-600 mb-4">{property.location}</p>
          <p className="text-2xl font-semibold text-gray-800 mb-4">{formattedPrice}</p>

          <div className="flex justify-between items-center text-gray-700 border-t pt-4">
            <div className="flex items-center space-x-2">
              <FaBed className="text-primary" />
              <span>{property.beds}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaBath className="text-primary" />
              <span>{property.baths}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaRulerCombined className="text-primary" />
              <span>{property.area} m²</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;