// src/components/FeaturedProperties.jsx

import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import SkeletonCard from './SkeletonCard';
import { getProperties } from '../services/propertyService';

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const allProperties = await getProperties();
        // Pega os 3 imóveis mais recentes para usar como destaque
        setProperties(allProperties.slice(0, 3));
      } catch (error) {
        console.error("Erro ao buscar imóveis em destaque:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <section className="bg-light-gray py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">
          Imóveis em Destaque
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Exibe 3 skeletons enquanto carrega
            [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            // Exibe os cards de imóveis após o carregamento
            properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;