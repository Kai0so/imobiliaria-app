// src/pages/HomePage.jsx

import React from 'react';
import PageWrapper from '../components/PageWrapper'; // Importe o wrapper
import Hero from '../components/Hero';
import FeaturedProperties from '../components/FeaturedProperties';

const HomePage = () => {
  return (
    <PageWrapper> {/* Envolva todo o conteúdo da página */}
      <Hero />
      <FeaturedProperties />
    </PageWrapper>
  );
};

export default HomePage;