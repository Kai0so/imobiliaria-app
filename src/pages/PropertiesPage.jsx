// src/pages/PropertiesPage.jsx

import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import SkeletonCard from '../components/SkeletonCard';
import { getProperties } from '../services/propertyService';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'framer-motion';

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Atraso entre a animação de cada filho
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const allProperties = await getProperties();
        setProperties(allProperties);
      } catch (error) {
        console.error("Erro ao buscar todos os imóveis:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProperties();
  }, []);

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-primary mb-6">Nossos Imóveis</h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore nosso catálogo completo de imóveis disponíveis para venda e aluguel.
        </p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loading ? (
            [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
          ) : properties.length > 0 ? (
            properties.map(property => (
              <motion.div key={property.id} variants={itemVariants}>
                <PropertyCard key={property.id} property={property} />
              </motion.div>
            ))
          ) : (
            <p>Nenhum imóvel encontrado.</p>
          )}
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default PropertiesPage;